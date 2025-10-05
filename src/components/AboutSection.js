import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './AboutSection.css';
import agapeLogoSmall from '../assets/agape-logo.png'; // Make sure you have this logo

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const AboutSection = () => {
  return (
    // We add an 'id' so the navbar link can jump to it later
    <section id="about" className="about-section">
      <Container>
        {/* Main 3-column layout */}
        <Row className="align-items-center">
          {/* Column 1: Vertical Text */}
          <Col md={1} className="d-none d-md-block">
            <div className="vertical-text">
              <span>A</span>
              <span>G</span>
              <span>A</span>
              <span>P</span>
              <span>E</span>
            </div>
          </Col>

          {/* Column 2: Logo */}
          <Col md={4} className="logo-column">
            <img src={agapeLogoSmall} alt="AGAPE Curiously Strong Love" className="about-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
          </Col>

          {/* Column 3: Description */}
          <Col md={7} className="description-column">
            <p>
              AGAPE is a personality development school for Grades 4–9. Our programs empower
              students to realize their potential and build essential life skills
              for a brighter tomorrow.
            </p>
            <p>
              In a caring, nurturing environment, we combine classic values
              with modern methods to shape confident, kind, and capable
              individuals ready for the world.
            </p>
            <button variant="dark" className="learn-btn">Learn More</button>
          </Col>
        </Row>

        {/* Footer Info Row */}
        <Row className="footer-info-row">
          <Col>
            <p>© 2025 All Rights Reserved</p>
            <ul>
              <li>☆ Grades 4–9</li>
              <li>♡ Life Skills</li>
              <li>⎊ Holistic Growth</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;