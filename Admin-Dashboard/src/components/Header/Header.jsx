import React from 'react';
import { Search, Filter, Share } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-500">Overview of your shop's orders</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-white shadow-md rounded-full px-4 py-2 flex items-center space-x-2">
          <span className="text-gray-600">Nanny's Shop</span>
          <img 
            src="/api/placeholder/32/32" 
            alt="Shop" 
            className="w-8 h-8 rounded-full"
          />
        </div>
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          + Create New Order
        </button>
      </div>
    </div>
  );
};

export default Header;