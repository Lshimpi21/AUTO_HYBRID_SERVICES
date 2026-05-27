import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaCarSide, FaTools, FaShoppingCart, FaHome, FaCog, FaMapMarkerAlt } from 'react-icons/fa';
import Landing from './pages/Landing';
import ServiceCatalog from './pages/ServiceCatalog';
import ServiceManagement from './pages/ServiceManagement';
import SeedServices from './pages/SeedServices';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import './App.css';

// Set API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
window.API_BASE_URL = API_BASE_URL;
axios.defaults.baseURL = API_BASE_URL;
const ADMIN_PASSWORD = 'admin123';

function App() {
  const [cart, setCart] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState('');

  useEffect(() => {
    const apiUrl = window.API_BASE_URL || '/api';
    axios.post(`${apiUrl}/metrics/visit`).catch((err) => console.error('Visitor metric failed', err));
  }, []);

  const handleAdminButton = () => {
    if (isAdmin) {
      setIsAdmin(false);
      setShowAdminLogin(false);
      setAdminPasswordInput('');
      setAdminError('');
    } else {
      setShowAdminLogin(true);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPasswordInput('');
      setAdminError('');
    } else {
      setAdminError('Invalid password. Please try again.');
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-violet-950 text-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-violet-200 hover:text-violet-100">
                <FaCarSide /> AUTO HYBRID SERVICE SHOP
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
                  onClick={handleAdminButton}
                  className="flex items-center gap-2 bg-blue-700 px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  <FaCog /> {isAdmin ? 'Logout Admin' : 'Admin'}
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

        {showAdminLogin && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
              <h2 className="text-3xl font-bold mb-4">Admin Login</h2>
              <p className="mb-4 text-gray-600">Enter the admin password to edit services.</p>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Password</label>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded px-4 py-3 focus:outline-none focus:border-blue-500"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {adminError && <p className="text-red-600">{adminError}</p>}
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminLogin(false);
                      setAdminPasswordInput('');
                      setAdminError('');
                    }}
                    className="px-5 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
