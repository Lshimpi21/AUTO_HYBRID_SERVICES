import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import './ServiceCatalog.css';

const fallbackServices = [
  { id: '1', name: 'Engine Oil Change', category: 'Maintenance', price: 1500, duration: '30-45 mins', description: 'Professional engine oil and filter replacement', image: '', icon: '🛢️' },
  { id: '2', name: 'Brake Pad Replacement', category: 'Maintenance', price: 2500, duration: '1 hour', description: 'Premium brake pad replacement for safety', image: '', icon: '🛑' },
  { id: '3', name: 'Wheel Alignment', category: 'Maintenance', price: 500, duration: '45 mins', description: 'Professional wheel alignment service', image: '', icon: '📐' },
  { id: '4', name: 'AC Gas Refill', category: 'Cooling', price: 2500, duration: '30-45 mins', description: 'AC refrigerant refill for cooling comfort', image: '', icon: '❄️' },
  { id: '5', name: 'Battery Check & Service', category: 'Electrical', price: 200, duration: '15 mins', description: 'Complete battery health check and maintenance', image: '', icon: '🔋' },
  { id: '6', name: 'Car Wash', category: 'Detailing', price: 500, duration: '45 mins', description: 'Professional car wash and dry', image: '', icon: '💦' },
  { id: '7', name: 'Dent Removal', category: 'Bodywork', price: 1500, duration: '1-2 hours', description: 'Expert dent removal per panel', image: '', icon: '🎯' },
  { id: '8', name: 'Headlight Replacement', category: 'Electrical', price: 1100, duration: '30-45 mins', description: 'LED/HID headlight replacement service', image: '', icon: '💡' },
  { id: '9', name: 'Fuel Filter Replacement', category: 'Maintenance', price: 1200, duration: '20-30 mins', description: 'Fuel filter replacement for better efficiency', image: '', icon: '⛽' },
  { id: '10', name: 'Interior Cleaning', category: 'Detailing', price: 2000, duration: '1-2 hours', description: 'Deep interior car cleaning service', image: '', icon: '🧹' },
];

function ServiceCatalog({ cart, setCart }) {
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(price) || 0);

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [fetchError, setFetchError] = useState('');

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get('/services');
      const topServices = response.data.slice(0, 10);
      setServices(topServices);
      setFilteredServices(topServices);
      setCategories([...new Set(topServices.map(s => s.category))]);
    } catch (error) {
      console.error('Error fetching services:', error);
      setFetchError('');
      setServices(fallbackServices);
      setFilteredServices(fallbackServices);
      setCategories([...new Set(fallbackServices.map(s => s.category))]);
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
          {fetchError && <p className="text-sm text-red-600">{fetchError}</p>}
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
