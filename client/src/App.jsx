import React from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Companies from './components/Companies';
import Features from './components/Features';
import BigFeatures from './components/BigFeatures';
import Footer from './components/Footer';
import SubFooter from './components/SubFooter';
import MapPage from './components/MapPage';

export default function App() {
  return (
    <>
      <div className="top-banner">
        <div className="container">
          <div className="small-bold-text banner-text"></div>
        </div>
      </div>

      <Navbar />
      <Header />
      <Companies />
      <Features />
      <BigFeatures />
      {/* Map page (route selector) */}
      <MapPage />
      <Footer />
      <SubFooter />
    </>
  );
}
