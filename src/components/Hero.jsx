import React, { useState } from 'react';
import { Container} from 'react-bootstrap';
import './Hero.css';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


const Hero = () => {
  const [activePanel, setActivePanel] = useState(null);

  const panelVariants = {
    hiddenLeft: { x: '-100%', transition: { duration: 0.4, ease: 'easeInOut' } },
    hiddenRight: { x: '100%', transition: { duration: 0.4, ease: 'easeInOut' } },
    visible: { x: '0%', transition: { duration: 0.4, ease: 'easeInOut' } },
  };

  return (
    <Container fluid className="hero-section">
    <AnimatePresence>
        {activePanel && (
          <motion.div
            className="hero-overlay active" // Use existing overlay style
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePanel(null)} // Close on overlay click
          />
        )}
      </AnimatePresence>
      <div className="hero-inner-wrapper">
        {/* --- Clickable Side Bar (Left) --- */}
        <div
          className="side-click-bar left"
          onClick={() => setActivePanel(activePanel === 'stories' ? null : 'stories')}
        >
          <p>S<br/>t<br/>o<br/>r<br/>i<br/>e<br/>s</p> {/* Vertical Text */}
      </div>
      <div className="hero-content">
        <h1 className="hero-headline">Curiously Strong Love</h1>
        <p className="hero-description">
          AGAPE is a personality development school for Grades 4–9, empowering students
          to realize their potential and build essential life skills for a brighter tomorrow.
          <strong> Sign in or sign up now to book your personalized training sessions and begin the journey of growth.</strong>
        </p>
        <button variant="dark" size="lg" className="hero-btn">
          Sign In/Sign Up
        </button>
        <p className="hero-scroll-prompt">
          Scroll down to explore our personality development aids — from <strong>interactive surveys</strong> that help you discover your strengths and areas of growth, to <strong>inspiring stories</strong> that spark curiosity, resilience, and creativity. Dive into engaging resources designed to nurture confidence, empathy, leadership, and other essential life skills that prepare students for both academic success and real-world challenges.
        </p>
      </div>
      {/* --- Clickable Side Bar (Right) --- */}
        <div
          className="side-click-bar right"
          onClick={() => setActivePanel(activePanel === 'survey' ? null : 'survey')}
        >
           <p>S<br/>u<br/>r<br/>v<br/>e<br/>y<br/>s</p> {/* Vertical Text */}
        </div>

        {/* --- Animated Panels (Positioned absolutely) --- */}
        <AnimatePresence>
          {activePanel === 'stories' && (
            <motion.div
              key="stories-panel"
              className="animated-side-panel left"
              variants={panelVariants}
              initial="hiddenLeft"
              animate="visible"
              exit="hiddenLeft"
            >
              <div className="panel-content">
                 {/* Content similar to previous design */}
                <h3 className="panel-heading-small">Every story whispers a lesson — are you ready to listen?
Stories carry the warmth of human experience — they teach, heal, and inspire. Each tale reflects a journey of courage, emotion, and growth, reminding us that wisdom often hides in the simplest words.</h3>
                <h2 className="panel-heading-large">Agape.<br/><span>Stories</span></h2>
                <Link to="/stories" onClick={() => setActivePanel(null)}> {/* Close panel on navigate */}
                  <button className="panel-btn">Explore Stories</button>
                </Link>
                <button className="panel-close-btn" onClick={() => setActivePanel(null)}>×</button>
              </div>
            </motion.div>
          )}

          {activePanel === 'survey' && (
            <motion.div
              key="survey-panel"
              className="animated-side-panel right"
              variants={panelVariants}
              initial="hiddenRight"
              animate="visible"
              exit="hiddenRight"
            >
              <div className="panel-content">
                 {/* Content similar to previous design */}
                <h3 className="panel-heading-small">Your voice shapes our journey — ready to be heard?
Surveys are more than just questions — they’re conversations that help us understand, improve, and grow together. Every response adds a spark of insight, guiding us toward making experiences that truly matter.</h3>
                <h2 className="panel-heading-large">Agape.<br/><span>Surveys</span></h2>
                <Link to="/survey/start" onClick={() => setActivePanel(null)}> {/* Close panel on navigate */}
                  <button className="panel-btn">Know Yourself</button>
                </Link>
                 <button className="panel-close-btn" onClick={() => setActivePanel(null)}>×</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </Container>
  );
};

export default Hero;