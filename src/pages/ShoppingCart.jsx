import React, { useState } from 'react';
import { Heart, X, Clock, ChevronDown, HelpCircle } from 'lucide-react';

const ShoppingCart = () => {
  const [quantity, setQuantity] = useState(1);
  const [showMarkdown, setShowMarkdown] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {/* Top Banner */}
      {showMarkdown && (
        <div className="relative bg-gray-100 p-4 mb-6 rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Save Up to 40%</p>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                Shop All Our New Markdowns
              </a>
            </div>
            <button
              onClick={() => setShowMarkdown(false)}
              className="hover:bg-gray-200 p-1 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Free Shipping Banner */}
      <div className="mb-6">
        <p className="text-orange-500 mb-1">Free Shipping for Members.</p>
        <p className="text-sm text-gray-600">
          Become a Nike Member for fast and free shipping.{' '}
          <a href="#" className="underline hover:text-black transition-colors">
            Join us
          </a>{' '}
          or{' '}
          <a href="#" className="underline hover:text-black transition-colors">
            Sign-in
          </a>
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-2xl font-medium mb-6">Bag</h2>
          
          {/* Product Card */}
          <div className="flex gap-6 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <img
              src="/api/placeholder/150/150"
              alt="NikeCourt Air Max Volley"
              className="w-32 h-32 object-cover rounded-md"
            />
            
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">NikeCourt Air Max Volley</h3>
                  <p className="text-gray-600 text-sm">Women's Hard Court Tennis Shoe</p>
                  <p className="text-gray-600 text-sm">Black/White/Metallic Red Bronze</p>
                </div>
                <p className="font-medium">$90.00</p>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="relative">
                  <select 
                    className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-md hover:bg-gray-200 transition-colors"
                    value={8}
                  >
                    <option>8</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-3 pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    className="appearance-none bg-gray-100 px-4 py-2 pr-8 rounded-md hover:bg-gray-200 transition-colors"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {[1,2,3,4,5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-2 top-3 pointer-events-none" />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <button className="text-gray-600 hover:text-black transition-colors flex items-center gap-1">
                  <Heart size={16} />
                  <span className="text-sm">Move to Favorites</span>
                </button>
                <button className="text-gray-600 hover:text-black transition-colors text-sm">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Section */}
          <div className="mt-8">
            <h3 className="font-medium mb-2">Shipping</h3>
            <div className="flex items-center gap-2 text-orange-600">
              <Clock size={16} />
              <p className="text-sm">Just a few left. Order soon.</p>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Arrives Tue, Jul 20 - Thu, Jul 22
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4">Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <span className="text-sm">Do you have a Promo Code?</span>
                  <HelpCircle size={16} className="text-gray-400" />
                </div>
                <ChevronDown size={16} />
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(90 * quantity).toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Shipping & Handling</span>
                <span>$8.00</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>—</span>
              </div>

              <div className="border-t pt-4 flex justify-between font-medium">
                <span>Total</span>
                <span>${(90 * quantity + 8).toFixed(2)}</span>
              </div>

              <button className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition-colors">
                Checkout
              </button>

              <button className="w-full bg-gray-100 py-4 rounded-full hover:bg-gray-200 transition-colors">
                PayPal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;