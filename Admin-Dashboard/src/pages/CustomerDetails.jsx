import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  User, 
  ShoppingCart, 
  Calendar, 
  CreditCard, 
  Package, 
  ChevronLeft 
} from 'lucide-react';

const CustomerDetails = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders for the customer
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/orders/${clientId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const ordersData = await response.json();

        if (ordersData.length > 0) {
          // Extract customer details from the first order
          const firstOrder = ordersData[0];
          setCustomer({
            First_Name: firstOrder.First_Name,
            Last_Name: firstOrder.Last_Name,
            Email: firstOrder.Email,
            Phone_Number: firstOrder.Phone_Number,
            Customer_ID: firstOrder.Customer_ID,
          });
        }

        setOrders(ordersData); // Set the fetched orders
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  if (!customer) {
    return <div className="p-8">No customer found.</div>;
  }

  return (
    <div className="ml-20 bg-gray-50 min-h-screen p-8">
      {/* Back Button */}
      <button 
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        onClick={() => window.history.back()}
      >
        <ChevronLeft size={20} className="mr-2" />
        Back
      </button>

      {/* Customer Details Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {customer.First_Name} {customer.Last_Name}
            </h1>
            <p className="text-gray-500">{customer.Email}</p>
          </div>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-xl font-bold">{orders.length}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-xl font-bold">
              ${orders.reduce((total, order) => total + parseFloat(order.Total_Price), 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Customer ID</p>
            <p className="text-xl font-bold">{customer.Customer_ID}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="text-xl font-bold">{customer.Phone_Number}</p>
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Orders</h2>
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.Order_ID} className="hover:bg-gray-50 transition-colors border-b">
                <td className="px-6 py-4 text-gray-900">{order.Order_ID}</td>
                <td className="px-6 py-4 text-gray-600">{order.Order_Date.split("T")[0]}</td>
                <td className="px-6 py-4 text-gray-600">${order.Total_Price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDetails;