import React, { useState, useEffect } from 'react';
import { Search, Heart, ChevronDown, Star, Sliders, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';

const ProductCard = ({ product, onProductClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.product_id}`);
        onProductClick(product.product_name); // Track product click
      }}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
    >
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Prevent navigation when clicking favorite
          setIsFavorite(!isFavorite);
        }}
        className="absolute right-4 top-4 z-10 p-2 hover:bg-gray-50 rounded-full transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart 
          className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
          transition-colors duration-200`}
        />
      </button>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2">{product.product_name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating || '4.5'}</span> {/* Fallback rating */}
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-sm text-gray-600">154 sold</span>
        </div>
        <p className="text-blue-600 font-semibold">${product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p> {/* Display category */}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // Current page
  const limit = 50; // Fixed to 50 items per page
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories for filtering
  const [keywords, setKeywords] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [productVectors, setProductVectors] = useState({});
  const [userVector, setUserVector] = useState([]);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); // Set the products directly
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch keywords from the API
  const fetchKeywords = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/keywords');
      const data = await response.json();
      setKeywords(data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  // Fetch vocabulary from the API
   // Fetch vocabulary from the API
   const fetchVocabulary = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products/vocabulary');
      if (!response.ok) {
        throw new Error('Failed to fetch vocabulary');
      }
      const data = await response.json();
      setVocabulary(data.vocabulary); // Set the vocabulary state
      console.log('Vocabulary:', data.vocabulary); // Log the vocabulary array
    } catch (error) {
      console.error('Error fetching vocabulary:', error);
    }
  };

  // Generate product vectors
  const generateProductVectors = () => {
    const vectors = {};
    console.log(localStorage.userId)
    products.forEach((product) => {
      const vector = new Array(vocabulary.length).fill(0); // Initialize vector with 0s
      const productWords = product.product_name.toLowerCase().split(/\s+/); // Split product name into words

      // Check each word in the vocabulary
      productWords.forEach((word) => {
        const index = vocabulary.indexOf(word);
        if (index !== -1) {
          vector[index] = 1; // Set to 1 if word exists in product name
        }
      });

      vectors[product.product_id] = vector; // Map product ID to its vector
    });

    setProductVectors(vectors); // Set the product vectors state
  };

  // Update user vector on interaction
  const updateUserVector = (interactionText) => {
    const userId = localStorage.getItem('userId'); // Get the user ID
    if (!userId || vocabulary.length === 0) return; // If the user is not signed in or vocabulary is not loaded, do nothing

    const userVector = JSON.parse(localStorage.getItem(`userVector_${userId}`)); // Get the user's vector
    const words = interactionText.toLowerCase().split(/\s+/); // Split interaction text into words

    // Update the user vector
    words.forEach((word) => {
      const index = vocabulary.indexOf(word);
      if (index !== -1) {
        userVector[index] += 1; // Increment the corresponding index in the user vector
      }
    });

    // Save the updated vector to localStorage
    localStorage.setItem(`userVector_${userId}`, JSON.stringify(userVector));
    setUserVector(userVector); // Update the state
    console.log('Updated User Vector:', userVector); // Log the updated user vector
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    updateUserVector(query); // Update user vector based on search query
  };

  useEffect(() => {
    fetchProducts();
    fetchKeywords();
    fetchVocabulary(); // Fetch vocabulary when the component mounts
  }, []);

  // Generate product vectors when vocabulary or products change
  useEffect(() => {
    if (vocabulary.length > 0 && products.length > 0) {
      generateProductVectors();
      const userId = localStorage.getItem('userId'); // Get the user ID
      if (userId && vocabulary.length > 0) {
        const storedVector = localStorage.getItem(`userVector_${userId}`);
        if (storedVector) {
          setUserVector(JSON.parse(storedVector)); // Initialize the state with the stored vector
        } else {
          // Initialize user vector with zeros if it doesn't exist
          const initialVector = new Array(vocabulary.length).fill(0);
          localStorage.setItem(`userVector_${userId}`, JSON.stringify(initialVector));
          setUserVector(initialVector);
        }
      }
    }
  }, [vocabulary, products]);

  // Log product vectors to the console
  useEffect(() => {
    if (Object.keys(productVectors).length > 0) {
      console.log('Product Vectors:', productVectors);
    }
  }, [productVectors]);

  // Log user vector to the console
  useEffect(() => {
    if (userVector.length > 0) {
      console.log('User Vector:', userVector);
    }
  }, [userVector]);

    // Initialize user vector from localStorage


  // Get unique categories from products
  const categories = [...new Set(products.map(product => product.category))];

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Deselect category
        : [...prev, category] // Select category
    );
    setPage(1); // Reset to the first page when filters change
  };

  // Filter products based on search query and selected categories
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesSearch && matchesCategory;
  });

  // Paginate products
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination handlers
  const handleNextPage = () => {
    if (page * limit < filteredProducts.length) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 relative max-w-2xl mx-auto">
          <Autocomplete
            keywords={keywords}
            onSelectSuggestion={(suggestion) => handleSearch(suggestion)} // Track search interaction
            onFilter={(query) => handleSearch(query)} // Track search interaction
          />
        </div>
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className={`hidden md:block w-64 flex-shrink-0 ${isFiltersOpen ? '!block fixed inset-0 z-50 bg-white p-6' : ''}`}>
            <div className="bg-white rounded-lg p-6 space-y-6 shadow-sm sticky top-8">
              {isFiltersOpen && (
                <div className="md:hidden flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button 
                    onClick={() => setIsFiltersOpen(false)}
                    className="p-1 hover:bg-gray-50 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-gray-600">
                Showing {filteredProducts.length} results for <span className="font-semibold">'{searchQuery}'</span>
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">Sort by:</span>
                <div className="relative">
                  <select 
                    className="appearance-none pl-3 pr-8 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Sort products"
                  >
                    <option>Popular</option>
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.product_id}
                  product={product}
                  onProductClick={updateUserVector} // Pass click handler to ProductCard
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {page} of {Math.ceil(filteredProducts.length / limit)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={page * limit >= filteredProducts.length}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;