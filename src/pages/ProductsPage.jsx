import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ThumbsUp } from 'lucide-react';
import Navbar from '../components/Navbar';

const ReviewCard = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(review.likes);

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="flex items-center space-x-3 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div>
          <p className="font-medium text-sm">{review.name}</p>
          <p className="text-xs text-gray-500">{review.date}</p>
        </div>
      </div>
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
      <button
        onClick={() => {
          setLiked(!liked);
          setLikes(liked ? likes - 1 : likes + 1);
        }}
        className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ThumbsUp className={`w-4 h-4 ${liked ? 'text-blue-500' : ''}`} />
        <span>{likes}</span>
      </button>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error('Error fetching product:', err));
  }, []);

  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt="Product"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index ? 'border-black' : 'border-transparent'
                }`}
              >
                <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div>
          <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.reviews.length} reviews</span>
          </div>
          <p className="text-3xl font-semibold mb-8">${product.price}</p>

          {/* Sizes */}
          <div className="mb-8">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded border transition-all duration-200 ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4 mb-8">
            <button className="flex-1 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to cart</span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-200 ${
                isFavorite ? 'bg-red-50 border-red-200' : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-16">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8">
            {['Details', 'Reviews', 'Discussion'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 relative ${
                  activeTab === tab ? 'text-black' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'Reviews' && (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
