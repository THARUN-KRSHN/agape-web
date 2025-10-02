// Import React is no longer strictly necessary but good practice
import React from 'react';

// Import our custom components
import Header from './components/Header';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import TaglineSection from './components/TaglineSection';
import MissionSection from './components/MissionSection';
import StoriesSection from './components/StoriesSection';
import SurveysSection from './components/SurveysSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Import the main CSS file for the App component
import './App.css';

/**
 * The main App component which acts as the root of our application.
 * It assembles the different sections of our page.
 */
function App() {
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
}

export default App;