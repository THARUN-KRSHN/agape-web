import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './Hero.css';

const Hero = () => {
  return (
    <Container fluid className="hero-section">
      <div className="hero-content">
        <h1 className="hero-headline">Curiously Strong Love</h1>
        <p className="hero-description">
          AGAPE is a personality development school for Grades 4–9, empowering students
          to realize their potential and build essential life skills for a brighter tomorrow.
          <strong> Sign in or sign up now to book your personalized training sessions and begin the journey of growth.</strong>
        </p>
        <Button variant="dark" size="lg" className="hero-button">
          Sign In/Sign Up
        </Button>
        <p className="hero-scroll-prompt">
          Scroll down to explore our personality development aids — from <strong>interactive surveys</strong> that help you discover your strengths and areas of growth, to <strong>inspiring stories</strong> that spark curiosity, resilience, and creativity. Dive into engaging resources designed to nurture confidence, empathy, leadership, and other essential life skills that prepare students for both academic success and real-world challenges.
        </p>
      </div>
    </Container>
  );
};

export default Hero;