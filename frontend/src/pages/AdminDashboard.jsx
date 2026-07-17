import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/useAdmin";

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminOverview from "../components/Admin/AdminOverview";
import MenuManagement from "../components/Admin/MenuManagement";
import ReservationManagement from "../components/Admin/ReservationManagement";
import OrderManagement from "../components/Admin/OrderManagement";
import GalleryManagement from "../components/Admin/GalleryManagement";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { logoutAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin-login");
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "overview":
        return "Dashboard Overview";
      case "menu":
        return "Menu Management";
      case "orders":
        return "Order Management";
      case "reservations":
        return "Reservation Management";
      case "gallery":
        return "Gallery Management";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {getPageTitle()}
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && <AdminOverview />}

          {activeTab === "menu" && <MenuManagement />}

          {activeTab === "orders" && <OrderManagement />}

          {activeTab === "reservations" && (
            <ReservationManagement />
          )}

          {activeTab === "gallery" && (
            <GalleryManagement />
          )}
        </main>
      </div>
    </div>
  );
}