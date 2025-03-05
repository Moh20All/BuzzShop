import React, { useState } from 'react';
import { 
  LayoutGrid, 
  ShoppingCart, 
  Users, 
  MessageCircle, 
  Gift, 
  Settings
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import logo from '../../assets/logo.png'
const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(1);

  const sidebarItems = [
    { icon: LayoutGrid, id: 0, path: '/dashboard' },
    { icon: ShoppingCart, id: 1, path: '/orders' },
    { icon: Users, id: 2, path: '/customers' },
    { icon: MessageCircle, id: 3, path: '/messages' },
    { icon: Gift, id: 4, path: '/promotions' },
    { icon: Settings, id: 5, path: '/settings' }
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-white border-r shadow-lg flex flex-col items-center pt-8 space-y-6">
      <div className="mb-4">
        <img 
          src={logo} 
          alt="Logo" 
          className="w-12 h-12 "
        />
      </div>
      {sidebarItems.map((item) => (
        <SidebarItem 
          key={item.id}
          item={item}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      ))}
    </div>
  );
};

export default Sidebar;