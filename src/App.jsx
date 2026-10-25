import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const id = hash.replace('#', '').split('?')[0];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-navy-900 selection:bg-brand-500 selection:text-white">
      <ScrollToTop />
      
      {/* Sticky Header with Language Toggle & CTAs */}
      <Header />

      {/* Main Routed Content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingActions />

      {/* Sticky Bottom Action Bar for Mobile Visitors (<768px) */}
      <MobileBottomBar />
    </div>
  );
}
