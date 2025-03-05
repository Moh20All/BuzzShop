import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const OrdersTableRow = ({ order }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors border-b">
      <td className="px-6 py-4">
        <div className="flex items-center">

          <div>
            <div className="text-sm font-medium text-gray-900">
              {order.customerName}
            </div>
            <div className="text-xs text-gray-500">
              {order.orderType}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{order.orderDate}</div>
        <div className="text-xs text-gray-500">{order.orderTime}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.orderType}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">
        {order.trackingId}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-900">
        {order.orderTotal}
      </td>
      <td className="px-6 py-4">
        <button className="text-gray-500 hover:text-gray-700">
          <MoreHorizontal size={20} />
        </button>
      </td>
      <td className="px-6 py-4">
        <span 
          className={`
            px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
            ${order.status === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : order.status === 'Pending' 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-gray-100 text-gray-800'}
          `}
        >
          {order.status}
        </span>
      </td>
    </tr>
  );
};

export default OrdersTableRow;