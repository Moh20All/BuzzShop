import { useState } from "react";
import React from "react";
import { ShoppingCart, Menu, X, ShoppingBag, PersonStanding } from "lucide-react"; // Import Lucide icons
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false); // State for mobile menu

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleshop = ()=>{
    window.location.href = '/cart'
  }
  const handleuser = ()=>{
    window.location.href = '/signin'
  }
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-bold flex-shrink-0">
            <a href="/" className="hover:text-gray-300">
              BuzzShop
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-normal">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="/products" className="hover:text-gray-300">
              Shop
            </a>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
              Collection
            </a>
          </div>

          {/* Icons (Cart and Mobile Menu Toggle) */}
          <div className="flex items-center space-x-6">
            {/* Cart Icon */}
            <button onClick={handleshop} className="hover:text-gray-300 relative">
              <ShoppingBag className="w-6 h-6" />
              <personalbar/>
            </button>
            <button onClick={handleuser} className="hover:text-gray-300 relative">
              <CiUser className="w-6 h-6" />
              <personalbar/>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden hover:text-gray-300 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" /> // Close icon
              ) : (
                <Menu className="w-6 h-6" /> // Menu icon
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-3 space-y-2">
            <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded-md">
              Home
            </a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded-md">
              Shop
            </a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded-md">
              About
            </a>
            <a href="#" className="block px-3 py-2 hover:bg-gray-800 rounded-md">
              Collection
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;