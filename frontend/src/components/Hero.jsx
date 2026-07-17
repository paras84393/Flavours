import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div 
      className="relative h-96 md:h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=600&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="text-center text-white z-10 px-4">
        <p className="text-orange-500 text-lg font-semibold mb-2">NEW EXPERIENCE</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Authentic Flavors<br />
          <span className="text-orange-500">Modern Twist</span>
        </h1>
        <p className="text-gray-300 mb-8 text-lg">Experience the finest Indian cuisine with a modern touch</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/menu">
            <button className="bg-red-800 text-white px-8 py-3 rounded-lg hover:bg-red-900 transition font-semibold hover:scale-105 transform">
              View Menu
            </button>
          </Link>
          <Link to="/reservation">
            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold hover:scale-105 transform">
              Book a Table
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}