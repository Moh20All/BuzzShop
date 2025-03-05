import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';

// Summary Card Component
const CustomerSummaryCard = ({ icon: Icon, label, value, percentage, color }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`${color} w-6 h-6`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-center space-x-2">
        <p className="text-xl font-bold">{value}</p>
        {percentage && (
          <span 
            className={`
              text-xs px-2 py-1 rounded-full
              ${percentage.startsWith('+') 
                ? 'bg-green-100 text-green-600' 
                : 'bg-red-100 text-red-600'}
            `}
          >
            {percentage}
          </span>
        )}
      </div>
    </div>
  </div>
);

const CustomersPage = () => {
  const [customers, setCustomers] = useState([]); // State to store fetched customers
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch customer data from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Calculate summary card values
  const totalCustomers = customers.length;
  const newCustomers = customers.filter(customer => {
    const customerSince = new Date(customer.Customer_Since);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return customerSince > oneMonthAgo;
  }).length;
  const activeCustomers = customers.filter(customer => customer.Status === 'Active').length;
  const inactiveCustomers = totalCustomers - activeCustomers;

  // Summary Cards Data
  const summaryCards = [
    {
      icon: Users,
      label: 'Total Customers',
      value: totalCustomers,
      percentage: '+15%',
      color: 'text-blue-500'
    },
    {
      icon: UserPlus,
      label: 'New Customers',
      value: newCustomers,
      percentage: '+10%',
      color: 'text-green-500'
    },
    {
      icon: Users,
      label: 'Active Customers',
      value: activeCustomers,
      percentage: '+12%',
      color: 'text-purple-500'
    },
    {
      icon: Users,
      label: 'Inactive Customers',
      value: inactiveCustomers,
      percentage: '-5%',
      color: 'text-orange-500'
    }
  ];

  // Display loading or error messages
  if (isLoading) {
    return <div className="ml-20 bg-gray-50 min-h-screen p-8">Loading...</div>;
  }

  if (error) {
    return <div className="ml-20 bg-gray-50 min-h-screen p-8">Error: {error}</div>;
  }

  return (
    <div className="ml-20 bg-gray-50 min-h-screen p-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500">Manage and track your customer base</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2">
          <UserPlus size={20} />
          <span>Add New Customer</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <CustomerSummaryCard key={index} {...card} />
        ))}
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-md">
        {/* Table Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Customers List</h2>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search customers" 
                className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search 
                className="absolute left-3 top-3 text-gray-400" 
                size={20} 
              />
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-100 transition-colors">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {[
                'Customer Name', 
                'Email', 
                'Phone', 
                'Orders', 
                'Order Total', 
                'Status'
              ].map((header) => (
                <th 
                  key={header} 
                  className="text-left px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors border-b"
              >
                <td className="px-6 py-4 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full mr-3 flex items-center justify-center">
                    {customer.Customer_Name.charAt(0)}
                  </div>
                  <span className="font-medium">{customer.Customer_Name}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{customer.Email}</td>
                <td className="px-6 py-4 text-gray-600">{customer.Phone}</td>
                <td className="px-6 py-4 text-gray-600">{customer.Orders}</td>
                <td className="px-6 py-4 font-medium">{customer.Order_Total}</td>
                <td className="px-6 py-4">
                  <span 
                    className={`
                      px-2 py-1 rounded-full text-xs
                      ${customer.Status === 'Active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'}
                    `}
                  >
                    {customer.Status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreHorizontal size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing 1-{customers.length} of {customers.length} items
          </span>
          <div className="flex items-center space-x-2">
            <button className="p-2 border rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
            <div className="flex space-x-1">
              {[1,2,3,4,5].map((page) => (
                <button 
                  key={page}
                  className={`
                    w-8 h-8 rounded-lg
                    ${page === 1 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'}
                  `}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-2 border rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;