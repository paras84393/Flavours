import React from 'react';
import { BarChart3, Users, ShoppingCart, Calendar } from 'lucide-react';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Orders', value: '156', icon: ShoppingCart, color: 'bg-blue-500' },
    { label: 'Reservations', value: '48', icon: Calendar, color: 'bg-green-500' },
    { label: 'Total Customers', value: '324', icon: Users, color: 'bg-purple-500' },
    { label: 'Revenue', value: '₹45,230', icon: BarChart3, color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">New reservation from John Doe</span>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Order #1245 completed</span>
            <span className="text-sm text-gray-500">4 hours ago</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">New customer registration</span>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}