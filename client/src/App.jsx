import React from 'react';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Companies from './Components/Companies';
import Features from './Components/Features';
import BigFeatures from './Components/BigFeatures';
import Footer from './Components/Footer';
import SubFooter from './Components/SubFooter';
import MapPage from './Components/MapPage';

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
