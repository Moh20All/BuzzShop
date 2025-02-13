import React, { useState, useEffect } from 'react';
import { Search, Heart, ChevronDown, Star, Sliders, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  // Parse description and image if they are strings
  const description = typeof product.description === 'string' 
    ? JSON.parse(product.description) 
    : product.description;

  const images = typeof product.image === 'string' 
    ? JSON.parse(product.image) 
    : product.image;
console.log(product.image)
  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
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
      
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
        <img 
          src={images[0]} // Use the first image in the array
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-sm text-gray-600">154 sold</span>
        </div>
        <p className="text-blue-600 font-semibold">${product.price}</p>
      </div>
    </div>
  );
};
const safeParseJSON = (data, fallback) => {
  try {
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (error) {
    console.error('Error parsing JSON:', error, data);
    return fallback; // Return a safe fallback value
  }
};
const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
  
        // Normalize names (trim spaces, lowercase) and remove duplicates
        const uniqueProducts = Array.from(
          new Map(
            data.map(item => [item.name.trim().toLowerCase(), item])
          ).values()
        );
  
        const formattedProducts = uniqueProducts.map(product => {
          const images = safeParseJSON(product.image.replace(/'/g, '"'), []);
          return {
            ...product,
            description: safeParseJSON(product.description.replace(/'/g, '"'), []),
            image: images,
            thumbnail: images.length > 0 ? images[0] : '/placeholder.jpg'
          };
        });
  
        setProducts(formattedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  
  

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 relative max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for Nike Shoe"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              aria-label="Search products"
            />
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500"
            >
              <Sliders className="w-5 h-5" />
            </button>
          </div>
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
              
              <div>
                <h3 className="font-semibold mb-4">Merchant Type</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Official Store ⭐', value: 'official' },
                    { label: 'Top Merchant 🔥', value: 'top' },
                    { label: 'Dropshipper 🏪', value: 'dropshipper' }
                  ].map((merchant) => (
                    <label key={merchant.value} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="merchant" 
                        value={merchant.value}
                        checked={selectedMerchant === merchant.value}
                        onChange={(e) => setSelectedMerchant(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{merchant.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Location</h3>
                <div className="space-y-3">
                  {['DKI Jakarta', 'Yogyakarta', 'Surabaya', 'Bandung'].map(location => (
                    <label key={location} className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={selectedLocation === location}
                        onChange={(e) => setSelectedLocation(e.target.checked ? location : 'all')}
                      />
                      <span className="text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="200"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                      className="w-full range-slider"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-gray-600">
                Showing {products.length} results for <span className="font-semibold">'Nike Shoe'</span>
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
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;