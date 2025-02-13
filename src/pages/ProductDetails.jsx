import React, { useState } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('Details');

  const images = [
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500",
    "/api/placeholder/500/500"
  ];

  const sizes = [
    '40.5', '41', '42', '43', '44.5', '44', '44.5', '45', '46'
  ];

  const reviews = [
    {
      name: "Helen M.",
      date: "Yesterday",
      rating: 5,
      comment: "Excellent running shoes. It turns very sharply on the foot.",
      likes: 42
    },
    {
      name: "Ann D.",
      date: "2 days ago",
      rating: 4,
      comment: "Good shoes",
      likes: 38
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={images[selectedImage]}
              alt="Product"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, index) => (
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
          <div className="flex items-center space-x-2 mb-4">
            <img src="/api/placeholder/24/24" alt="Reebok" className="w-6 h-6 rounded-full" />
            <span className="text-sm">Reebok</span>
          </div>

          <h1 className="text-2xl font-semibold mb-4">Shoes Reebok Zig Kinetica 3</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">52 reviews</span>
          </div>

          <p className="text-3xl font-semibold mb-8">$199.00</p>

          <div className="mb-8">
            <h3 className="font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              <button className="w-8 h-8 rounded-full bg-white border-2 border-black" />
              <button className="w-8 h-8 rounded-full bg-gray-200" />
              <button className="w-8 h-8 rounded-full bg-black" />
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-medium mb-2">Size</h3>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
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

          <div className="text-sm text-gray-500">
            Free delivery on orders over $50.0
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
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="py-8">
          {activeTab === 'Reviews' && (
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-semibold">4.8</div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <div className="text-sm text-gray-500 w-3">{rating}</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400"
                          style={{
                            width: `${rating === 5 ? '70' : rating === 4 ? '20' : '10'}%`
                          }}
                        />
                      </div>
                      <div className="text-sm text-gray-500 w-8">
                        {rating === 5 ? '28' : rating === 4 ? '9' : '4'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;