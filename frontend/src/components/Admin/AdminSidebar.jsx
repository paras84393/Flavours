import React, { useState } from "react";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Calendar,
  ShoppingCart,
  Image,
  Menu,
  X,
} from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    {
      id: "overview",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "menu",
      label: "Menu Management",
      icon: UtensilsCrossed,
    },
    {
      id: "gallery",
      label: "Gallery",
      icon: Image,
    },
    {
      id: "reservations",
      label: "Reservations",
      icon: Calendar,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-red-800 text-white p-2 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-0"
        } bg-gray-900 text-white transition-all duration-300 overflow-hidden md:w-64`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-8">
            Lal Chutney
          </h2>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);

                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                      ? "bg-red-800 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}