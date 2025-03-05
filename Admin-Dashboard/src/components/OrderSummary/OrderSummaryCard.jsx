import React from 'react';

const OrderSummaryCard = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
      <p className="text-sm text-gray-500 mb-2">{item.label}</p>
      <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
    </div>
  );
};

export default OrderSummaryCard;