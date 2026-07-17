import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const categories = ['Starters', 'Mains', 'Street Food', 'Desserts', 'Beverages'];

  useEffect(() => {
    fetchMenu();
  }, [activeCategory, refreshKey]);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching menu for category:', activeCategory);
      const items = await menuAPI.getAll(activeCategory);
      console.log('Menu items received:', items);
      setMenuItems(items);
    } catch (err) {
      setError('Error loading menu: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to manually refresh menu
  const handleRefresh = () => {
    console.log('Refreshing menu...');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Crafted with Passion</h1>
        <p className="text-center text-gray-600 mb-8">Explore a symphony of spices and flavors from the heart of India</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={handleRefresh} className="text-sm underline font-semibold">
              Retry
            </button>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                activeCategory === category
                  ? 'bg-red-800 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-red-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Refresh Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={handleRefresh}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            🔄 Refresh Menu
          </button>
        </div>

        {/* Menu Items */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
              <p className="mt-4 text-gray-600">Loading menu items...</p>
            </div>
          </div>
        ) : menuItems.length === 0 ? (
          <div className="text-center py-12 text-gray-600">
            <p className="text-lg">No items available in this category</p>
            <p className="text-sm mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {menuItems.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
                <div className="mb-4">
                  <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-lg p-4 text-center">
                    <p className="text-gray-600 text-sm">🍽️ {item.category}</p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                
                <p className="text-gray-600 mb-4 text-sm min-h-[40px]">
                  {item.description || 'Delicious and authentic Indian cuisine'}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-red-800">₹{item.price}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    item.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {item.status === 'Available' && (
                  <button className="w-full bg-red-800 text-white py-2 rounded-lg hover:bg-red-900 transition font-semibold">
                    Add to Cart
                  </button>
                )}
                
                {item.status === 'Out of Stock' && (
                  <button disabled className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed font-semibold">
                    Out of Stock
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}