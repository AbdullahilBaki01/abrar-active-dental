import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import Services from '../components/Services';
import Doctors from '../components/Doctors';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import FAQ from '../components/FAQ';
import AppointmentForm from '../components/AppointmentForm';
import Contact from '../components/Contact';
import VerticalScrollNav from '../components/VerticalScrollNav';
import { clinicData } from '../data/clinic';
import { useLanguage } from '../i18n/LanguageContext';

export default function Home() {
  const { isBn } = useLanguage();
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    const service = searchParams.get('service');
    const doctor = searchParams.get('doctor');
    if (service) setSelectedService(service);
    if (doctor) setSelectedDoctor(doctor);
  }, [searchParams]);

  const handleSelectService = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleSelectDoctor = (doctorId) => {
    setSelectedDoctor(doctorId);
  };

  return (
    <>
      <SEO
        title={isBn ? `${clinicData.nameBn} | আধুনিক ডেন্টাল ক্লিনিক` : `${clinicData.name} | Modern Dental Clinic in Bangladesh`}
        description={isBn ? clinicData.taglineBn : clinicData.tagline}
        canonicalUrl={clinicData.siteUrl}
      />

      <main>
        {/* Hero Section with Open Now & Trust Chips */}
        <Hero />

        {/* Why Choose Us - 5 Medical Trust Pillars */}
        <WhyChooseUs />

        {/* Services Grid (Data-driven) */}
        <Services onSelectService={handleSelectService} />

        {/* Doctors Profiles & Specialities */}
        <Doctors onSelectDoctor={handleSelectDoctor} />

        {/* Clinic & Smile Gallery with Lightbox */}
        <Gallery />

        {/* Patient Reviews Carousel + Facebook Link */}
        <Reviews />

        {/* FAQ Accordion */}
        <FAQ />

        {/* Appointment Form with WhatsApp prefill */}
        <AppointmentForm
          initialService={selectedService}
          initialDoctor={selectedDoctor}
        />

        {/* Contact, Hours & Google Map */}
        <Contact />

        {/* Floating Side Vertical Scroll Snap Navigation */}
        <VerticalScrollNav />
      </main>
    </>
  );
}
