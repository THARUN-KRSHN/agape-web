import React from 'react';
import { Container, Row, Col, Form, Button, Accordion } from 'react-bootstrap';
import './ContactSection.css';

// 3. Add your social logos to src/assets/images
import instaLogo from '../assets/images/instagram.png';
import linkedInLogo from '../assets/images/linkedin.png';
import whatsappLogo from '../assets/images/whatsapp.png';

const ContactSection = () => {
  return (
    <section id="contact" className="contact-section-wrapper">
      <Container className="contact-section">
        <div className="contact-header">
          <h3>Connect With Us</h3>
          <p>Follow AGAPE on social media and join our growing community of students, parents, and educators. Celebrate new milestones and stay up-to-date with events!</p>
          <div className="social-icons">
            <a href="#!"><img src={instaLogo} alt="Instagram"/></a>
            <a href="#!"><img src={linkedInLogo} alt="LinkedIn"/></a>
            <a href="#!"><img src={whatsappLogo} alt="WhatsApp"/></a>
          </div>
        </div>
        <Row className="mt-5">
          {/* Column 1: Form */}
          <Col md={7}>
            <Form>
              <Row>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control type="text" placeholder="Jane Smith" /></Form.Group></Col>
                <Col md={6}><Form.Group className="mb-3"><Form.Label>Email</Form.Label><Form.Control type="email" placeholder="jane@fromer.com" /></Form.Group></Col>
              </Row>
              <Form.Group className="mb-3"><Form.Label>Message</Form.Label><Form.Control as="textarea" rows={4} placeholder="Your message..." /></Form.Group>
              <Button type="submit" className="submit-btn">Submit</Button>
            </Form>
          </Col>
          {/* Column 2: Accordion FAQ */}
          <Col md={5}>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0"><Accordion.Header>What makes AGAPE unique?</Accordion.Header><Accordion.Body>AGAPE combines classic values with modern, science-backed teaching methods in small, nurturing batches to focus on holistic personality development, not just academic skills.</Accordion.Body></Accordion.Item>
              <Accordion.Item eventKey="1"><Accordion.Header>Who can join AGAPE?</Accordion.Header><Accordion.Body>Our programs are designed for students in Grades 4 through 9, a crucial period for personality and character development.</Accordion.Body></Accordion.Item>
              <Accordion.Item eventKey="2"><Accordion.Header>How do I enroll my child?</Accordion.Header><Accordion.Body>You can start by signing up on our platform and booking a personalized training or counseling session. From there, our team will guide you through the enrollment process.</Accordion.Body></Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default ContactSection;