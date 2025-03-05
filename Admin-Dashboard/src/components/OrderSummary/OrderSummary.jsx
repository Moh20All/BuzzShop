import React from 'react';
import OrderSummaryCard from './OrderSummaryCard';

const OrderSummary = ({ orderSummary }) => {
  return (
    <div className="grid grid-cols-7 gap-4 mb-8">
      {orderSummary.map((item, index) => (
        <OrderSummaryCard key={index} item={item} />
      ))}
    </div>
  );
};

export default OrderSummary;