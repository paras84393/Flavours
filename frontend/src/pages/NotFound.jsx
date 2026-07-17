import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-800 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-8">Page Not Found</p>
        <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className="bg-red-800 text-white px-8 py-3 rounded-lg hover:bg-red-900 transition">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
}