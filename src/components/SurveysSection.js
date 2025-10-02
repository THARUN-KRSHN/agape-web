import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './SurveysSection.css'; 
// 2. Add your survey image to the src/assets/images folder
import surveyImage from '../assets/images/survey-image.png'; 

const SurveysSection = () => {
  return (
    <section id="survey" className="promo-section-wrapper">
      <Container className="promo-section surveys-section">
        <Row className="align-items-center">
          {/* Column 1: Content (Order is swapped here) */}
          <Col md={7} className="promo-content">
            <h2 className="promo-heading">Agape.<span>Surveys</span></h2>
            <p>
              At AGAPE, we understand that self-awareness is the first step toward growth. Our personality development survey is designed to help you uncover your strengths, identify areas of improvement, and gain deeper insights into your unique traits. With thoughtfully curated questions and an easy-to-follow process, the survey gives you a personalized score that reflects your growth journey. It’s more than just numbers—it’s a mirror to your potential, guiding you toward becoming the best version of yourself with clarity and confidence.
            </p>
            <Button className="promo-btn">Know Yourself</Button>
          </Col>
          {/* Column 2: Image */}
          <Col md={5}>
            <img src={surveyImage} alt="A student taking a survey" className="promo-image" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SurveysSection;