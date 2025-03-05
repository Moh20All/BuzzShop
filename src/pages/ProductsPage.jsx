import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Search, Heart, ChevronDown, Star, Sliders, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from '../components/Autocomplete';

const ProductCard = React.memo(({ product, onProductClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/products/${product.product_id}`);
    onProductClick(product.product_name);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative group"
    >
      <button 
        onClick={handleFavoriteClick}
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
          <span className="text-sm text-gray-600">{product.rating || '4.5'}</span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-sm text-gray-600">154 sold</span>
        </div>
        <p className="text-blue-600 font-semibold">${product.price}</p>
        <p className="text-sm text-gray-500">{product.category}</p>
      </div>
    </div>
  );
});

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [vocabulary, setVocabulary] = useState([]);
  const [productVectors, setProductVectors] = useState({});
  const [userVector, setUserVector] = useState([]);
  
  const limit = 50;

  // Fetch API data with error handling
  const fetchData = useCallback(async (url, errorMessage) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(errorMessage || `Failed to fetch from ${url}`);
      }
      return await response.json();
    } catch (err) {
      console.error(`Error fetching from ${url}:`, err);
      return null;
    }
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    try {
      const data = await fetchData('http://localhost:5000/api/products', 'Failed to fetch products');
      if (data) {
        setProducts(data);
      } else {
        setError('Failed to fetch products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Fetch keywords
  const fetchKeywords = useCallback(async () => {
    const data = await fetchData('http://localhost:5000/api/keywords', 'Failed to fetch keywords');
    if (data) {
      setKeywords(data);
    }
  }, [fetchData]);

  // Fetch vocabulary
  const fetchVocabulary = useCallback(async () => {
    const data = await fetchData('http://localhost:5000/api/products/vocabulary', 'Failed to fetch vocabulary');
    if (data) {
      setVocabulary(data.vocabulary);
    }
  }, [fetchData]);

  // Generate product vectors
  const generateProductVectors = useCallback(() => {
    if (!vocabulary.length || !products.length) return;
    
    const vectors = {};
    products.forEach((product) => {
      const vector = new Array(vocabulary.length).fill(0);
      const productWords = product.product_name.toLowerCase().split(/\s+/);

      productWords.forEach((word) => {
        const index = vocabulary.indexOf(word);
        if (index !== -1) {
          vector[index] = 1;
        }
      });

      vectors[product.product_id] = vector;
    });

    setProductVectors(vectors);
  }, [vocabulary, products]);

  // Update user vector on interaction
  const updateUserVector = useCallback((interactionText) => {
    const userId = localStorage.getItem('userId');
    if (!userId || !vocabulary.length) return;

    const storedVector = localStorage.getItem(`userVector_${userId}`);
    const currentVector = storedVector ? JSON.parse(storedVector) : new Array(vocabulary.length).fill(0);
    const words = interactionText.toLowerCase().split(/\s+/);

    let isUpdated = false;
    words.forEach((word) => {
      const index = vocabulary.indexOf(word);
      if (index !== -1) {
        currentVector[index] += 1;
        isUpdated = true;
      }
    });

    if (isUpdated) {
      localStorage.setItem(`userVector_${userId}`, JSON.stringify(currentVector));
      setUserVector(currentVector);
    }
  }, [vocabulary]);

  // Handle search with debounce
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    updateUserVector(query);
  }, [updateUserVector]);

  // Initialize data
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([fetchProducts(), fetchKeywords(), fetchVocabulary()]);
    };
    fetchAllData();
  }, [fetchProducts, fetchKeywords, fetchVocabulary]);

  // Generate product vectors when vocabulary or products change
  useEffect(() => {
    generateProductVectors();
  }, [vocabulary, products, generateProductVectors]);

  // Initialize user vector from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId && vocabulary.length > 0) {
      const storedVector = localStorage.getItem(`userVector_${userId}`);
      if (storedVector) {
        setUserVector(JSON.parse(storedVector));
      } else {
        const initialVector = new Array(vocabulary.length).fill(0);
        localStorage.setItem(`userVector_${userId}`, JSON.stringify(initialVector));
        setUserVector(initialVector);
      }
    }
  }, [vocabulary]);

  // Handle category selection
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setPage(1);
  }, []);

  // Memoize categories
  const categories = useMemo(() => {
    return [...new Set(products.map(product => product.category))];
  }, [products]);

  // Memoize filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategories]);

  // Memoize paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, page, limit]);

  // Pagination handlers
  const handleNextPage = useCallback(() => {
    if (page * limit < filteredProducts.length) {
      setPage(page + 1);
    }
  }, [page, limit, filteredProducts.length]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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
            onSelectSuggestion={handleSearch}
            onFilter={handleSearch}
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
                Showing {filteredProducts.length} results {searchQuery && <span>for <span className="font-semibold">'{searchQuery}'</span></span>}
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
                  onProductClick={updateUserVector}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            {filteredProducts.length > limit && (
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
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;