import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { menuAPI } from '../../services/api';

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Starters',
    price: '',
    status: 'Available',
    description: ''
  });

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    console.log('Token in MenuManagement:', token);
    if (!token) {
      setError('No authentication token found. Please login again.');
    }
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      setError('');
      console.log('Fetching menu items...');
      const items = await menuAPI.getAll();
      console.log('Menu items fetched:', items);
      setMenuItems(items);
    } catch (err) {
      console.error('Error loading menu items:', err);
      setError('Error loading menu items: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price) {
      setError('Please fill all required fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      console.log('Adding item:', formData);

      const response = await menuAPI.create({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        status: formData.status,
      });

      console.log('Add response:', response);

      if (response.success) {
        setMenuItems([...menuItems, response.data]);
        setFormData({ 
          name: '', 
          category: 'Starters', 
          price: '', 
          status: 'Available',
          description: ''
        });
        setShowForm(false);
      } else {
        setError(response.message || 'Failed to add item');
      }
    } catch (err) {
      console.error('Error adding item:', err);
      setError('Error adding item: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setError('');
      console.log('Deleting item:', id);
      const response = await menuAPI.delete(id);
      
      console.log('Delete response:', response);

      if (response.success) {
        setMenuItems(menuItems.filter(item => item._id !== id));
      } else {
        setError(response.message || 'Failed to delete item');
      }
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Error deleting item: ' + err.message);
    }
  };

  if (loading && menuItems.length === 0) {
    return <div className="text-center py-8 text-lg">Loading menu items...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition font-semibold"
      >
        <Plus size={20} />
        Add New Item
      </button>

      {showForm && (
        <form onSubmit={handleAddItem} className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Item Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800"
                placeholder="Enter item name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800"
              >
                <option>Starters</option>
                <option>Mains</option>
                <option>Street Food</option>
                <option>Desserts</option>
                <option>Beverages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Price *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800"
                placeholder="Enter price"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800"
              >
                <option>Available</option>
                <option>Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800"
              placeholder="Enter item description"
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Add Item
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setFormData({ 
                  name: '', 
                  category: 'Starters', 
                  price: '', 
                  status: 'Available',
                  description: ''
                });
              }}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Menu Items Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        {menuItems.length === 0 ? (
          <div className="p-6 text-center text-gray-600">
            No menu items yet. Add one to get started!
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Item Name</th>
                <th className="px-6 py-3 text-left font-semibold">Category</th>
                <th className="px-6 py-3 text-left font-semibold">Price</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map(item => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3 font-semibold">{item.name}</td>
                  <td className="px-6 py-3">{item.category}</td>
                  <td className="px-6 py-3">₹{item.price}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{item.description || '-'}</td>
                  <td className="px-6 py-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}