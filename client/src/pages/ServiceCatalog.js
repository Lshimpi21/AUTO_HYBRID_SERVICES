import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import './ServiceCatalog.css';

function ServiceCatalog({ cart, setCart }) {
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(price) || 0);

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get('/services');
      const topServices = response.data.slice(0, 10);
      setServices(topServices);
      setFilteredServices(topServices);
      setCategories([...new Set(topServices.map(s => s.category))]);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
      setFilteredServices([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredServices(services);
    } else {
      setFilteredServices(services.filter(s => s.category === selectedCategory));
    }
  }, [selectedCategory, services]);

  const addToCart = (service) => {
    setCart([...cart, { ...service, cartId: Date.now() }]);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading services...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 mb-8">
          <h1 className="text-4xl font-bold">Our Services</h1>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
            }`}
          >
            All Services
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Service Image */}
              <div className="w-full h-48 bg-gray-300 overflow-hidden">
                {service.image ? (
                  <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 text-white text-3xl">
                    🚗
                  </div>
                )}
              </div>

              {/* Service Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{formatPrice(service.price)}</span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded">
                    {service.duration}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(service)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No services found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceCatalog;
