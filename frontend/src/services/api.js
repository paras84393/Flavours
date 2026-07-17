const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('adminToken');
};

// Get headers with authorization
const getHeaders = (includeContentType = true) => {
  const headers = {
    'Authorization': `Bearer ${getToken()}`,
  };
  
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

// Admin API
export const adminAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  register: async (email, password, name) => {
    try {
      const response = await fetch(`${API_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  getProfile: async () => {
    try {
      const response = await fetch(`${API_URL}/admin/profile`, {
        headers: getHeaders(),
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Menu API calls
export const menuAPI = {
  getAll: async (category = null) => {
    try {
      const url = category ? `${API_URL}/menu?category=${category}` : `${API_URL}/menu`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch menu');
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/menu/${id}`);
      if (!response.ok) throw new Error('Failed to fetch menu item');
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu item:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create menu item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update menu item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete menu item');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  },
};

// Reservation API
export const reservationAPI = {
  getAll: async (status = null) => {
    try {
      const url = status ? `${API_URL}/reservations?status=${status}` : `${API_URL}/reservations`;
      const response = await fetch(url, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch reservations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch reservation');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create reservation');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update reservation');
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/reservations/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete reservation');
      return await response.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw error;
    }
  },
};

// Order API
export const orderAPI = {
  getAll: async (status = null) => {
    try {
      const url = status ? `${API_URL}/orders?status=${status}` : `${API_URL}/orders`;
      const response = await fetch(url, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch order');
      return await response.json();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create order');
      }
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  updateStatus: async (id, status) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update order');
      return await response.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to delete order');
      return await response.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },

  getDashboardStats: async () => {
    try {
      const response = await fetch(`${API_URL}/orders/stats/dashboard`, {
        headers: getHeaders(),
      });
      if (!response.ok) throw new Error('Failed to fetch stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  },
};

const API = "http://localhost:5000/api/gallery";

export const getGallery = async () => {
    const res = await fetch(API);

    if (!res.ok) {
        throw new Error("Failed to fetch gallery");
    }

    return res.json();
};