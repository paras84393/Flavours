import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export default function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is already logged in
    const storedAdmin = localStorage.getItem('adminUser');
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
    setLoading(false);
  }, []);

  const loginAdmin = (email, password) => {
    // Simple authentication (in real app, verify with backend)
    const ADMIN_EMAIL = 'admin@lalchutney.com';
    const ADMIN_PASSWORD = 'admin123';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminData = { email, id: 1 };
      localStorage.setItem('adminUser', JSON.stringify(adminData));
      setAdmin(adminData);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    localStorage.removeItem('adminUser');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}