import React, { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import { orderAPI } from '../../services/api';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await orderAPI.getAll();
      setOrders(data);
    } catch (err) {
      setError('Error loading orders: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      const response = await orderAPI.updateStatus(id, status);
      if (response.success) {
        setOrders(orders.map(order =>
          order._id === id ? { ...order, status } : order
        ));
      }
    } catch (err) {
      setError('Error updating order: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-8">Loading orders...</div>;

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Order ID</th>
              <th className="px-6 py-3 text-left font-semibold">Customer</th>
              <th className="px-6 py-3 text-left font-semibold">Amount</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
              <th className="px-6 py-3 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">{order.orderNumber}</td>
                <td className="px-6 py-3">{order.customerName}</td>
                <td className="px-6 py-3 font-semibold">₹{order.totalAmount}</td>
                <td className="px-6 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Ready'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Ready</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-3">
                  <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <Eye size={18} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}