import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (className) => {
    const el = document.querySelector('.' + className);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav>
      <div className="container main-nav flex">
        <a href="#" className="company-logo">
          <img src="/assets/asset 1.png" alt="company logo" width="180" />
        </a>

        <div className={`nav-links ${isOpen ? 'active' : ''}`} id="nav-links">
          <ul className="flex">
            <li><a href="#" className="hover-link" onClick={() => scrollToSection('companies-section')}>Customers</a></li>
            <li><a href="#" className="hover-link" onClick={() => scrollToSection('features-section')}>Features</a></li>
            <li><a href="#" className="hover-link" onClick={() => scrollToSection('big-feature-section')}>How It Works</a></li>
            <li><a href="#" className="hover-link">FAQs</a></li>
            <li><a href="#" className="hover-link primary-button">Sign up</a></li>
          </ul>
        </div>

        <button className="nav-toggle hover-link" id="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}
