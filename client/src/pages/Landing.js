import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhone, FaStar, FaCheckCircle, FaTools, FaClock, FaMapMarkerAlt, FaWrench, FaTrophy, FaEnvelope, FaCarSide } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';
import './Landing.css';

function Landing() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(price) || 0);

  const fetchServices = async () => {
    try {
      const apiUrl = window.API_BASE_URL || '/api';
      const response = await axios.get(`${apiUrl}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppClick = (serviceName) => {
    const apiUrl = window.API_BASE_URL || '/api';
    axios.post(`${apiUrl}/metrics/whatsapp`).catch((err) => console.error('WhatsApp metric failed', err));
    const phoneNumber = '919834446217';
    const message = `Hi! I'm interested in ${serviceName}. Could you provide more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const portfolioItems = [
    { title: 'Engine Overhaul', image: '🔧', desc: 'Complete engine restoration' },
    { title: 'Body Work', image: '🚗', desc: 'Professional panel beating' },
    { title: 'Paint Job', image: '🎨', desc: 'Expert automotive painting' },
    { title: 'Interior Restoration', image: '💺', desc: 'Premium upholstery work' },
  ];

  const team = [
    { name: 'John Doe', role: 'Lead Mechanic', exp: '15+ years', icon: FaWrench },
    { name: 'Mike Johnson', role: 'Senior Technician', exp: '12+ years', icon: FaTools },
    { name: 'Alex Smith', role: 'Certified Specialist', exp: '10+ years', icon: FaTrophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <section className="hero-section-enhanced relative h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-background absolute inset-0">
          <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            {/* Gradient Background */}
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#1e3a8a', stopOpacity: 0.95}} />
                <stop offset="100%" style={{stopColor: '#1e40af', stopOpacity: 0.95}} />
              </linearGradient>
            </defs>
            <rect width="1200" height="600" fill="url(#heroGradient)" />
            
            {/* Mechanic illustration */}
            <g>
              {/* Garage door */}
              <rect x="700" y="150" width="400" height="350" fill="#3b82f6" stroke="#1e40af" strokeWidth="3" rx="10"/>
              <line x1="900" y1="150" x2="900" y2="500" stroke="#1e40af" strokeWidth="2"/>
              <line x1="800" y1="225" x2="1000" y2="225" stroke="#1e40af" strokeWidth="1" opacity="0.5"/>
              <line x1="800" y1="300" x2="1000" y2="300" stroke="#1e40af" strokeWidth="1" opacity="0.5"/>
              <line x1="800" y1="375" x2="1000" y2="375" stroke="#1e40af" strokeWidth="1" opacity="0.5"/>
              
              {/* Car */}
              <ellipse cx="850" cy="330" rx="70" ry="40" fill="#ef4444"/>
              <circle cx="820" cy="370" r="15" fill="#000"/>
              <circle cx="880" cy="370" r="15" fill="#000"/>
              <rect x="800" y="300" width="100" height="30" rx="5" fill="#ef4444" opacity="0.7"/>
              
              {/* Tools */}
              <rect x="100" y="420" width="80" height="15" fill="#f59e0b" rx="7"/>
              <circle cx="120" cy="400" r="12" fill="#f59e0b"/>
              <line x1="150" y1="350" x2="200" y2="320" stroke="#f59e0b" strokeWidth="3"/>
            </g>
          </svg>
        </div>
        
        <div className="hero-content-enhanced relative z-10 max-w-5xl mx-auto text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-violet-200 drop-shadow-lg">
            <span className="inline-flex items-center gap-3">
              <FaCarSide className="text-white" />
              AUTO HYBRID SERVICE SHOP
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-blue-100 mb-8 drop-shadow-lg font-semibold">
            Expert Mechanics. Quality Guaranteed. Your Trust, Our Priority.
          </p>
          
          {/* Signboard Image */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/images/service-center-signboard.jpg" 
              alt="AUTO HYBRID SERVICE CENTRE Signboard" 
              className="w-64 md:w-80 rounded-lg shadow-2xl border-4 border-white hover:scale-105 transition transform"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => handleWhatsAppClick('Service Inquiry')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-12 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 text-lg shadow-lg"
            >
              <FaWhatsapp size={28} /> Get Free Consultation
            </button>
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg shadow-lg"
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* Facility Gallery Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Our Facility</h2>
            <p className="text-xl text-gray-600">
              State-of-the-art service center equipped with modern technology
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Service Center Signboard */}
            <div className="facility-card group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <img 
                src="/images/service-center-signboard.jpg" 
                alt="AUTO HYBRID SERVICE CENTRE Signboard" 
                className="w-full h-96 object-cover group-hover:brightness-110 transition"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Our Signboard</h3>
                <p className="text-gray-300">Professional branding of our service center</p>
              </div>
            </div>

            {/* Service Center Entrance */}
            <div className="facility-card group relative overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <img 
                src="/images/service-center-garage.jpg" 
                alt="AUTO HYBRID SERVICE CENTRE Garage" 
                className="w-full h-96 object-cover group-hover:brightness-110 transition"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Our Garage</h3>
                <p className="text-gray-300">Modern facility with expert technicians</p>
              </div>
            </div>
          </div>

          {/* Facility Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Infrastructure</h3>
              <p className="text-gray-600">Equipped with latest diagnostic and repair tools</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">👨‍🔧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Certified technicians with years of experience</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-lg text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">All work backed by warranty and guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4">Why Choose AUTO HYBRID SERVICE CENTRE?</h2>
            <p className="text-xl text-blue-100">The best choice for your automotive needs</p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaCheckCircle, title: 'Certified Technicians', desc: 'Factory trained professionals with certifications' },
              { icon: FaClock, title: 'Fast Turnaround', desc: 'Efficient service without quality compromise' },
              { icon: FaStar, title: '100% Guarantee', desc: 'Satisfaction guaranteed or your money back' },
              { icon: FaTrophy, title: 'Award Winning', desc: 'Recognized for excellence in the industry' },
            ].map((item, index) => (
              <div key={index} className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:bg-opacity-20 transition border border-white border-opacity-20">
                <item.icon className="text-green-400 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2 text-white text-center">{item.title}</h3>
                <p className="text-blue-100 text-center">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="stats-item">
            <div className="text-5xl font-bold text-blue-600 mb-2">500+</div>
            <p className="text-gray-600 font-semibold">Happy Customers</p>
          </div>
          <div className="stats-item">
            <div className="text-5xl font-bold text-green-600 mb-2">1000+</div>
            <p className="text-gray-600 font-semibold">Vehicles Serviced</p>
          </div>
          <div className="stats-item">
            <div className="text-5xl font-bold text-blue-600 mb-2">15+</div>
            <p className="text-gray-600 font-semibold">Years Experience</p>
          </div>
          <div className="stats-item">
            <div className="text-5xl font-bold text-green-600 mb-2">24/7</div>
            <p className="text-gray-600 font-semibold">Customer Support</p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Our Premium Services</h2>
            <p className="text-2xl text-gray-600 font-semibold">
              Comprehensive automotive solutions for every need
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading services...</p>
            </div>
          ) : services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(service => (
                <div key={service.id} className="service-card-premium bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-3">
                  <div className="service-image-placeholder relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-6xl">
                    <FaTools className="opacity-80" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-40 transition"></div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-3 text-gray-700">
                        <FaClock className="text-blue-600 flex-shrink-0" size={18} />
                        <span className="font-medium">{service.duration || '1-2 hours'}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <FaTools className="text-blue-600 flex-shrink-0" size={18} />
                        <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-semibold">
                          {service.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 pb-8 border-b">
                      <div>
                        <p className="text-gray-500 text-sm">Starting from</p>
                        <p className="text-4xl font-bold text-blue-600">
                          {formatPrice(service.price)}
                        </p>
                      </div>
                      <div className="text-5xl text-blue-200">→</div>
                    </div>

                    <button
                      onClick={() => handleWhatsAppClick(service.name)}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 shadow-md"
                    >
                      <FaWhatsapp size={22} /> Get Service Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No services available at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Section - Work Showcase */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-white">Our Work Portfolio</h2>
            <p className="text-xl text-gray-300">
              Showcasing the exceptional work and dedication of our skilled mechanics
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-card group relative overflow-hidden rounded-xl shadow-lg">
                <div className="portfolio-image-bg relative h-64 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <div className="text-7xl opacity-40 group-hover:opacity-100 transition">{item.image}</div>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-center p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                  <FaStar className="text-yellow-400 mt-4" size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600">
              Highly trained and certified professionals with years of experience
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-member bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                  <member.icon className="text-white text-7xl opacity-80" />
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold text-lg mb-2">{member.role}</p>
                  <div className="flex items-center justify-center gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-4 font-semibold">{member.exp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Before & After</h2>
            <p className="text-xl text-gray-600">
              See the transformation our mechanics can achieve
            </p>
            <div className="w-24 h-1 bg-green-500 mx-auto mt-6 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { before: '😟', after: '😊', title: 'Engine Restoration' },
              { before: '🚗', after: '✨', title: 'Paint & Polish' },
              { before: '⚙️', after: '⚡', title: 'Performance Upgrade' },
              { before: '🛠️', after: '🏆', title: 'Complete Overhaul' },
            ].map((item, index) => (
              <div key={index} className="before-after-card bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-2 gap-4 p-8">
                  <div className="text-center">
                    <div className="text-6xl mb-4">{item.before}</div>
                    <p className="font-bold text-gray-600">Before</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-3xl font-bold text-green-500">→</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-8 border-t">
                  <div className="flex items-center justify-center">
                    <div className="text-3xl font-bold text-green-500">→</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl mb-4">{item.after}</div>
                    <p className="font-bold text-green-600">After</p>
                  </div>
                </div>
                <div className="px-8 pb-8 text-center">
                  <h4 className="text-xl font-bold text-gray-900">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 text-gray-900">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Real reviews from satisfied customers</p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Smith',
                text: 'Exceptional service! The mechanics were professional and fixed my engine issue quickly. Worth every penny!',
                rating: 5
              },
              {
                name: 'Sarah Johnson',
                text: 'Best garage experience ever. Transparent pricing, friendly staff, and amazing workmanship.',
                rating: 5
              },
              {
                name: 'Mike Davis',
                text: 'My car runs better than ever after their complete overhaul. Highly recommend AUTO HYBRID SERVICE CENTRE!',
                rating: 5
              },
            ].map((testimonial, index) => (
              <div key={index} className="testimonial-card bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition border-l-4 border-green-500">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 mr-1" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-green-600 font-semibold">Verified Customer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">Get in Touch</h2>
          <p className="text-xl text-gray-600 mb-12">
            Have questions? Ready to book a service? Contact us today!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg">
              <FaPhone className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">+919834446217</p>
              <p className="text-gray-600 mb-6">Available for calls during business hours</p>
              <a href="tel:+919834446217" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 inline-block">
                Call Now
              </a>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg">
              <FaWhatsapp className="text-4xl text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">WhatsApp</h3>
              <p className="text-3xl font-bold text-green-600 mb-4">+919834446217</p>
              <p className="text-gray-600 mb-6">Get instant replies on WhatsApp</p>
              <button 
                onClick={() => handleWhatsAppClick('General Inquiry')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
              >
                <FaWhatsapp size={20} /> Message Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-24 px-4 bg-gradient-to-r from-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
            <pattern id="dots" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="50" cy="50" r="3" fill="white" />
            </pattern>
            <rect width="1200" height="600" fill="url(#dots)" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Ready to Transform Your Vehicle?</h2>
          <p className="text-2xl text-green-100 mb-12">
            Get professional service today with expert mechanics and guaranteed satisfaction
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button
              onClick={() => handleWhatsAppClick('Service Booking')}
              className="bg-white text-green-700 hover:bg-green-50 text-white font-bold py-4 px-12 rounded-lg flex items-center justify-center gap-3 transition transform hover:scale-105 text-lg shadow-xl hover:shadow-2xl"
            >
              <FaWhatsapp size={28} className="text-green-700" /> Book Your Service
            </button>
            <button
              onClick={() => handleWhatsAppClick('Price Inquiry')}
              className="bg-green-800 hover:bg-green-900 text-white font-bold py-4 px-12 rounded-lg transition transform hover:scale-105 text-lg shadow-lg border-2 border-white"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-2xl mb-4">
              <FaTools /> AUTO HYBRID SERVICE CENTRE
            </div>
            <p className="text-gray-400 leading-relaxed">
              Professional automotive repair and maintenance services for all vehicle types. Quality work guaranteed.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-green-500 transition">Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-green-500 transition">Gallery</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-green-500 transition">Pricing</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-green-500 transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <p className="text-gray-400 flex items-center gap-2">
                <FaPhone className="text-green-500" /> +919834446217
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <FaEnvelope className="text-green-500" /> autohybrideservicecentre@gmail.com
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <FaMapMarkerAlt className="text-green-500" /> Vinayak Nagar, Pimple Nilakh, Pune 411027
              </p>
              <p className="text-gray-400">
                <span className="font-semibold text-white">Hours:</span><br/>
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">&copy; 2024 AUTO HYBRID SERVICE CENTRE. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#services" className="text-gray-400 hover:text-green-500 transition">Privacy Policy</a>
            <a href="#services" className="text-gray-400 hover:text-green-500 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
