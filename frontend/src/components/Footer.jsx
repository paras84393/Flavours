import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-orange-500">Flavours</h3>
            <p className="text-gray-400">Bringing the authentic taste of India with a modern twist.</p>
          </div>

          {/* Location & Hours */}
          <div>
            <h4 className="font-bold mb-4">LOCATION & HOURS</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin size={18} /> 123 Main Street, City
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} /> Mon - Sun: 11:00 AM - 11:00 PM
              </p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">CONTACT</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Phone size={18} /> +1 (555) 123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} /> info@flavours.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
              <li><a href="/menu" className="hover:text-orange-500 transition">Menu</a></li>
              <li><a href="/gallery" className="hover:text-orange-500 transition">Gallery</a></li>
              <li><a href="/reservation" className="hover:text-orange-500 transition">Reservation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Flavours. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}