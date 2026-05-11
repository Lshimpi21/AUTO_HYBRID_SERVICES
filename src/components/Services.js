import React from 'react';
import './Services.css';

const Services = () => {
  const servicesList = [
    {
      id: 1,
      icon: '🔧',
      title: 'Maintenance',
      description: 'Regular maintenance and inspections for optimal performance'
    },
    {
      id: 2,
      icon: '🔋',
      title: 'Battery Service',
      description: 'Hybrid battery diagnostics and replacement services'
    },
    {
      id: 3,
      icon: '⚙️',
      title: 'Engine Service',
      description: 'Professional engine repair and optimization'
    },
    {
      id: 4,
      icon: '🛡️',
      title: 'Warranty Support',
      description: 'Full warranty coverage and extended protection plans'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div className="services-grid">
          {servicesList.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
