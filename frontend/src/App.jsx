import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminProvider from './context/AdminContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// User Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <AdminProvider>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          {/* User Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/reservation" element={<Reservation />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>
      </AdminProvider>
    </Router>
  );
}

export default App;