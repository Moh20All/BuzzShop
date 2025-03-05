import React from 'react';
import { 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp 
} from 'lucide-react';

// Summary Card Component
const SummaryCard = ({ icon: Icon, label, value, percentage, color }) => (
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

// Recent Orders Component
const RecentOrders = () => {
  const orders = [
    { 
      product: 'iPhone 13', 
      price: '$730,000.00', 
      status: 'Completed',
      date: '12 Dec 2022'
    },
    // Add more mock orders
  ];

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
      </div>
      <div className="divide-y">
        {orders.map((order, index) => (
          <div key={index} className="p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{order.product}</p>
              <p className="text-sm text-gray-500">{order.price}</p>
            </div>
            <div>
              <span 
                className={`
                  px-2 py-1 rounded-full text-xs
                  ${order.status === 'Completed' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'}
                `}
              >
                {order.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">{order.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Marketing Chart Component
const MarketingChart = () => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Marketing</h2>
      <div className="flex space-x-2">
        <button className="text-xs bg-gray-100 px-2 py-1 rounded">Visitor</button>
        <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Customer</button>
      </div>
    </div>
    <div className="h-48 flex items-center justify-center">
      <div className="w-48 h-48 rounded-full border-8 border-blue-100 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold">32%</p>
            <p className="text-xs text-gray-500">Active</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Sales Chart Component
const SalesChart = () => (
  <div className="bg-white rounded-xl shadow-md p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Summary</h2>
      <select className="text-sm text-gray-500 border rounded px-2 py-1">
        <option>Sales</option>
      </select>
    </div>
    <div className="h-48 flex items-end space-x-2">
      {[1,2,3,4,5,6,7].map((_, index) => (
        <div 
          key={index} 
          className="w-10 bg-blue-500 rounded-t-lg"
          style={{height: `${Math.random() * 150 + 50}px`}}
        />
      ))}
    </div>
  </div>
);

// Dashboard Page
const Dashboard = () => {
  const summaryCards = [
    {
      icon: TrendingUp,
      label: 'Sales Volume',
      value: '$4,000',
      percentage: '+20.00%',
      color: 'text-blue-500'
    },
    {
      icon: Users,
      label: 'Customers',
      value: '1,250',
      percentage: '+15%',
      color: 'text-green-500'
    },
    {
      icon: Package,
      label: 'All Products',
      value: '45',
      percentage: '+10%',
      color: 'text-purple-500'
    },
    {
      icon: ShoppingCart,
      label: 'All Orders',
      value: '450',
      percentage: '+5%',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="ml-20 bg-gray-50 min-h-screen p-8 flex-grow">

    <div className=" p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500">Track and manage your business</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <SummaryCard key={index} {...card} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-3 gap-6">
        {/* Marketing Chart */}
        <div className="col-span-1">
          <MarketingChart />
        </div>

        {/* Sales Chart */}
        <div className="col-span-2">
          <SalesChart />
        </div>

        {/* Recent Orders */}
        <div className="col-span-3">
          <RecentOrders />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;