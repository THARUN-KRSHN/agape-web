import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './StoriesSection.css';
// 1. Create src/assets/images folder and add your story image there
import storyImage from '../assets/images/story-image.png'; 

const StoriesSection = () => {
  return (
    <section id="stories" className="promo-section-wrapper">
      <Container className="promo-section stories-section">
        <Row className="align-items-center">
          {/* Column 1: Image */}
          <Col md={5}>
            <img src={storyImage} alt="A student reading stories" className="promo-image" />
          </Col>
          {/* Column 2: Content */}
          <Col md={7} className="promo-content">
            <h2 className="promo-heading">Agape.<span>Stories</span></h2>
            <p>
              At AGAPE, we believe stories are more than just words—they are mirrors, mentors, and milestones in life’s journey. With 100+ handpicked stories and immersive audiobooks, we bring tales that spark imagination, nurture values, and guide personality development in subtle yet powerful ways. Each story inspires reflection, builds resilience, and helps you grow into the best version of yourself—making learning not just meaningful, but deeply personal.
            </p>
            <Button className="promo-btn">Explore Stories</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StoriesSection;