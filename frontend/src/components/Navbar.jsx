import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-red-800">Flavours</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-800 transition">
              Home
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-red-800 transition">
              Menu
            </Link>
            <Link to="/gallery" className="text-gray-700 hover:text-red-800 transition">
              Gallery
            </Link>
            <Link to="/reservation" className="text-gray-700 hover:text-red-800 transition">
              Reservation
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition">
              Order Now
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block text-gray-700 hover:text-red-800 py-2">
              Home
            </Link>
            <Link to="/menu" className="block text-gray-700 hover:text-red-800 py-2">
              Menu
            </Link>
            <Link to="/gallery" className="block text-gray-700 hover:text-red-800 py-2">
              Gallery
            </Link>
            <Link to="/reservation" className="block text-gray-700 hover:text-red-800 py-2">
              Reservation
            </Link>
            <button className="w-full bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900">
              Order Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}