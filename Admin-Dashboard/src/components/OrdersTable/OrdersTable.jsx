import React from 'react';
import OrdersTableHeader from './OrdersTableHeader';
import OrdersTableRow from './OrdersTableRow';

const OrdersTable = ({ orders }) => {
  return (
    <table className="w-full">
      <thead className="bg-gray-100">
        <OrdersTableHeader />
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrdersTableRow key={order.id} order={order} />
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;