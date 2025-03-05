import React from 'react';

const OrdersTableHeader = () => {
  const headers = ['Customer Name', 'Order Date', 'Order Type', 'Tracking ID', 'Order Total', 'Action', 'Status'];

  return (
    <tr>
      {headers.map((header) => (
        <th 
          key={header} 
          className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {header}
        </th>
      ))}
    </tr>
  );
};

export default OrdersTableHeader;