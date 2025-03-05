import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ item, activeTab, setActiveTab }) => {
  const Icon = item.icon;

  return (
    <Link 
      to={item.path} 
      onClick={() => setActiveTab(item.id)}
      className={`
        p-3 rounded-xl transition-all duration-300 
        ${activeTab === item.id 
          ? 'bg-indigo-500 text-white shadow-xl' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-indigo-600'}
      `}
    >
      <Icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
    </Link>
  );
};

export default SidebarItem;