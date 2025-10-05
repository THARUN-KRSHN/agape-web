import React, { useState } from 'react';
import { Container, Row, Col, Form, Navbar, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // We'll set up routing next
import './SurveyStart.css';
import logo from '../assets/agape-logo.png'; // Re-use the logo

const SurveyStart = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStart = async () => {
    if (!name || !age) {
      setError('Please enter both your name and age.');
      return;
    }
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch("https://agapedjango.onrender.com/api/quiz/");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const questions = await response.json();
      if (questions.length === 0) {
        throw new Error('No questions available');
      }
      navigate('/survey/questions', { state: { name, age, questions } });
    } catch (err) {
      setError(err.message || 'Failed to load survey questions. Please try again later.');
    }finally {
      setIsLoading(false);
    }
    // In the next step, we will navigate to the questions page
    // For now, this is a placeholder
    // navigate('/survey/questions', { state: { name, age } });
  };


  return (
    <>
      {/* Simplified header for the survey pages */}
      <Navbar className="survey-header">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} width="120" alt="AGAPE Logo" />
          </Navbar.Brand>
          <Navbar.Text className="header-tagline">
            India's First Personality Development School
          </Navbar.Text>
        </Container>
      </Navbar>

      {/* Main content */}
      <div className="survey-start-page">
        <Container>
          <div className="survey-start-box">
            <Row className="align-items-center">
              {/* Left Column: Description */}
              <Col md={7} className="survey-intro-text">
                <h1 className="survey-title">
                  Agape <br />
                  <span>Surveys</span>
                </h1>
                <p>
                  This survey is designed to help you discover your strengths, values, and unique traits. There are 16 <strong>simple questions</strong>—no right or wrong answers. Just be honest and choose what feels most natural to you. Take a deep breath, relax, and enjoy the process. Each response brings you closer to understanding yourself better. 🌱
                </p>
              </Col>

              {/* Right Column: Form */}
              <Col md={5}>
                <div className="survey-form">
                  <Form.Group className="mb-4">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Your Age" />
                  </Form.Group>
                  {error && <p className="text-danger">{error}</p>}
                  <button className="survey-btn" onClick={handleStart} disabled={isLoading}>{isLoading ? <Spinner as="span" animation="border" size="sm" /> : 'Unveil My Personality'}
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SurveyStart;