import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, ordersPerPage, totalOrders, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="bg-white px-6 py-4 border-t flex justify-between items-center">
      <span className="text-sm text-gray-600">
        Showing {(currentPage - 1) * ordersPerPage + 1}-{Math.min(currentPage * ordersPerPage, totalOrders)} of {totalOrders} items
      </span>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="p-2 border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex space-x-1">
          {pageNumbers.map((number) => (
            <button 
              key={number}
              onClick={() => paginate(number)}
              className={`
                w-8 h-8 rounded-lg
                ${currentPage === number 
                  ? 'bg-indigo-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
            >
              {number}
            </button>
          ))}
        </div>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === pageNumbers.length}
          className="p-2 border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;