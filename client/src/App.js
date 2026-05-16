import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaTools, FaShoppingCart, FaHome, FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import Landing from './pages/Landing';
import ServiceCatalog from './pages/ServiceCatalog';
import ServiceManagement from './pages/ServiceManagement';
import SeedServices from './pages/SeedServices';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import './App.css';

// Set API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
window.API_BASE_URL = API_BASE_URL;

function App() {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold hover:text-blue-200">
                <FaTools /> AUTO HYBRID SERVICE CENTRE
              </Link>

              <div className="hidden md:flex gap-8">
                <Link to="/" className="hover:text-blue-200 transition">
                  <FaHome className="inline mr-2" /> Home
                </Link>
                <Link to="/services" className="hover:text-blue-200 transition">
                  <FaTools className="inline mr-2" /> Services
                </Link>
                <Link to="/cart" className="hover:text-blue-200 transition relative">
                  <FaShoppingCart className="inline mr-2" /> Cart
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="hover:text-blue-200 transition">
                  Orders
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex items-center gap-1 text-sm text-blue-100">
                  <FaMapMarkerAlt size={14} />
                  <span>Vinayak Nagar, Pimple Nilakh, Pune 411027</span>
                </div>
                <button
                  onClick={() => setIsAdmin(!isAdmin)}
                  className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  <FaCog /> {isAdmin ? 'User Mode' : 'Admin'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/services" element={<ServiceCatalog cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/seed" element={<SeedServices />} />
          {isAdmin && <Route path="/admin/services" element={<ServiceManagement />} />}
        </Routes>

        {isAdmin && (
          <div className="fixed bottom-4 right-4 space-y-3 flex flex-col">
            <Link
              to="/admin/seed"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition text-center"
            >
              Seed Services
            </Link>
            <Link
              to="/admin/services"
              className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition text-center"
            >
              Manage Services
            </Link>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
