import React from 'react';
// Import all your homepage components
import Header from '../components/Header';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import TaglineSection from '../components/TaglineSection';
import MissionSection from '../components/MissionSection';
import StoriesSection from '../components/StoriesSection';
import SurveysSection from '../components/SurveysSection';
import TestimonialsSection from '../components/TestimonialsSection';
import ContactSection from '../components/ContactSection';
// ... import all other sections (About, Tagline, Mission, etc.)
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    // A main div to wrap the entire application
    <div className="App">
      {/* Render the Header component at the top */}
      <Header />
      <main>
        {/* Render the Hero section as the first part of the main content */}
        <Hero />
        <AboutSection />
        <TaglineSection />
        <MissionSection />
        <StoriesSection />
        <SurveysSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;