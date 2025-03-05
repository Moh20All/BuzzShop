import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import CustomersPage from './pages/CustomersPage';
import MessagesPage from './pages/MessagesPage';
import PromotionsPage from './pages/PromotionsPage';
import SettingsPage from './pages/SettingsPage';
import CustomerDetails from './pages/CustomerDetails';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          {/* Make OrdersPage the default route */}
          <Route path="/" element={<OrdersPage />} />
          <Route path="/customers/:clientId" element={<CustomerDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/promotions" element={<PromotionsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;