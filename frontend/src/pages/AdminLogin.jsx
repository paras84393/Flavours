import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../hooks/useAdmin';
import { AlertCircle } from 'lucide-react';
import { adminAPI } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@lalchutney.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await adminAPI.login(email, password);

      if (response.success && response.token) {
        // Store token and admin data
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem('adminUser', JSON.stringify(response.admin));
        
        // Update context
        loginAdmin(email, password);
        
        navigate('/admin/dashboard');
      } else {
        setError(response.message || 'Login failed');
      }
    } catch (err) {
      setError('Error: ' + (err.message || 'Login failed'));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-red-800 mb-2">Lal Chutney</h1>
        <p className="text-center text-gray-600 mb-8">Admin Panel Login</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800 focus:ring-2 focus:ring-red-200"
              placeholder="admin@lalchutney.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-800 focus:ring-2 focus:ring-red-200"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-800 text-white py-3 rounded-lg font-bold hover:bg-red-900 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
          <p className="text-sm font-mono text-gray-700">Email: admin@lalchutney.com</p>
          <p className="text-sm font-mono text-gray-700">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}