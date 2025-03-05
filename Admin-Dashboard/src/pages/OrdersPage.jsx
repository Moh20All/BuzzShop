import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const OrdersPage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [orders, setOrders] = useState([]); // State to store fetched orders
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const ordersPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/shipments');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShipments();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter orders based on search query and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.Order_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Customer_ID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.Tracking_Number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'All' || order.Shipment_Status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  // Display loading or error messages
  if (isLoading) {
    return <div className="ml-20 bg-gray-50 min-h-screen p-8">Loading...</div>;
  }

  if (error) {
    return <div className="ml-20 bg-gray-50 min-h-screen p-8">Error: {error}</div>;
  }

  return (
    <div className="ml-20 bg-gray-50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Customer Orders</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search orders" 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <Search 
                  className="absolute left-3 top-3 text-gray-400" 
                  size={20} 
                />
              </div>
              {/* Filter Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                  className="p-2 border rounded-lg hover:bg-gray-100 transition-colors flex items-center"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <Filter size={20} className="text-gray-600" />
                  <span className="ml-2 text-gray-600">Filter</span>
                </button>
                <div className={`absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 ${
                  !isDropdownOpen ? 'hidden' : ''
                }`}>
                  <button 
                    onClick={() => handleFilterChange('All')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Pending')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => handleFilterChange('Delivered')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Delivered
                  </button>
                  <button 
                    onClick={() => handleFilterChange('In Transit')}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    In Transit
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Carrier</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking Number</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Shipment Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr 
                  key={order.Shipment_ID} 
                  className="hover:bg-gray-50 transition-colors border-b"
                >
                  <td className="px-4 py-3 text-sm text-gray-900">{order.Shipment_ID}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{order.Order_ID}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.Shipment_Date.split("T")[0]}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.Carrier}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.Tracking_Number}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.Delivery_Date.split("T")[0]}</td>
                  <td className="px-4 py-3">
                    <span 
                      className={`
                        px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.Shipment_Status === 'Delivered' 
                          ? 'bg-green-100 text-green-800' 
                          : order.Shipment_Status === 'In Transit' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-gray-100 text-gray-800'}
                      `}
                    >
                      {order.Shipment_Status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{order.Order_Date.split("T")[0]}</td>
                  <td className="px-4 py-3 text-sm text-gray-500"><a className="text-teal-700 font-bold" href={'/customers/'+order.Customer_ID}>{order.Customer_ID}</a></td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.Total_Price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="bg-white px-4 py-3 border-t flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Showing {indexOfFirstOrder + 1}-{Math.min(indexOfLastOrder, filteredOrders.length)} of {filteredOrders.length} items
            </span>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="p-1 border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <ChevronLeft size={18} className="text-gray-600" />
              </button>
              <div className="flex space-x-1">
                {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`
                      w-7 h-7 rounded-lg text-sm
                      ${currentPage === i + 1 
                        ? 'bg-indigo-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'}
                    `}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === Math.ceil(filteredOrders.length / ordersPerPage)}
                className="p-1 border rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;