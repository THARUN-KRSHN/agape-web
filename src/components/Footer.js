import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';
import footerLogo from '../assets/agape-logo.png'; // Using the same main logo

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col md={3} className="text-center text-md-start mb-3 mb-md-0">
            <img src={footerLogo} alt="AGAPE Logo" className="footer-logo" onClick={scrollToTop} style={{ cursor: 'pointer' }} />
          </Col>
          <Col md={9}>
            <Row>
              <Col md={4} xs={6}>
                <h4>Explore</h4>
                <ul>
                  <li><a href="#about">About</a></li>
                  <li><a href="#vision">Vision & Mission</a></li>
                  <li><a href="#stories">Stories</a></li>
                </ul>
              </Col>
              <Col md={4} xs={6}>
                <h4>Support</h4>
                <ul>
                  <li><a href="#contact">Contact</a></li>
                  <li><a href="#!">FAQ</a></li>
                  <li><a href="#!">Session Booking</a></li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;