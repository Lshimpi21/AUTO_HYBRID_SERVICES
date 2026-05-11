import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <h1>🚗 Auto Hybrid Services</h1>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>
      <div className="hero">
        <div className="hero-content">
          <h2>Welcome to Auto Hybrid Services</h2>
          <p>Professional Automotive Solutions for Your Hybrid Vehicle</p>
          <button className="cta-btn">Get Started</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
