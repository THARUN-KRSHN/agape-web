import React, { useState, useEffect } from 'react';
import { Container, ProgressBar, Spinner, Navbar } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './SurveyQuestions.css';
import logo from '../assets/agape-logo.png';
import LoadingAnalysis from '../components/LoadingAnalysis';

const SurveyQuestions = () => {
  // Get the data passed from the SurveyStart page
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [questions, setQuestions] = useState([]);

  // State for the survey flow
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This effect runs once to get the data from the previous page
  useEffect(() => {
    if (location.state) {
      setUserData({ name: location.state.name, age: location.state.age });
      setQuestions(location.state.questions);
      // Initialize responses array with null values
      setResponses(new Array(location.state.questions.length).fill(null));
    } else {
      // If a user lands here directly, redirect them to the start
      navigate('/survey');
    }
  }, [location, navigate]);

  // Handler for when the user moves the slider
const handleResponseChange = (e) => {
  // Get the raw value from the slider (it might be a fraction)
  const rawValue = parseFloat(e.target.value);
  // Round it to the nearest whole number to get the final choice
  const selectedOptionIndex = Math.round(rawValue);

  const newResponses = [...responses];
  newResponses[currentQuestionIndex] = {
    questionId: questions[currentQuestionIndex].id,
    selectedOptionIndex: selectedOptionIndex
  };
  setResponses(newResponses);
};

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      name: userData.name,
      age: userData.age,
      responses: responses.filter(r => r !== null) // Filter out any unanswered questions
    };

    try {
      // POST the data to your analysis API
      const response = await fetch("https://agapedjango.onrender.com/api/analyze/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const resultData = await response.json();
      
      // Navigate to the result page with the analysis
      navigate('/survey/result', { state: { result: resultData,name: userData.name,age: userData.age} });

    } catch (error) {
      console.error("Failed to submit survey:", error);
      setIsSubmitting(false);
    }
  };


  // If questions haven't loaded yet, show a spinner
  if (questions.length === 0) {
    return <div className="loading-container"><Spinner animation="border" /></div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  if (isSubmitting) {
    return <LoadingAnalysis />;
  }

  return (
    <>
      <Navbar className="question-header">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} width="120" alt="AGAPE Logo" className='survey-logo'/></Navbar.Brand>
          <Navbar.Text className="header-tagline">
                      India's First Personality Development School
                    </Navbar.Text>
          <h2 className="survey-page-title">Agape <span>Surveys</span></h2>
        </Container>
      </Navbar>

      <div className="survey-questions-page">
        <Container>
          <div className="survey-box">
            <div className="progress-container">
              <span className="progress-percent">{Math.round(progress)}%</span>
              <ProgressBar now={progress} className="survey-progress-bar" />
              <span className="progress-count">{currentQuestionIndex + 1}/{questions.length}</span>
            </div>

            <h3 className="question-text">{currentQuestion.text}</h3>

            <div className="slider-container">
              <input 
                type="range"
                min="0"
                max={currentQuestion.options.length - 1}
                step="0.1"
                value={responses[currentQuestionIndex]?.selectedOptionIndex ?? 1.5} // Default to middle if not answered
                onChange={handleResponseChange}
                className="response-slider"
              />
              <div className="slider-labels">
                {currentQuestion.options.map((option, index) => (
                  <span key={index} className="slider-label">{option.text}</span>
                ))}
              </div>
            </div>

            <div className="navigation-buttons">
              <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="nav-btn prev-btn">Previous</button>
              {isLastQuestion ? (
                <button onClick={handleSubmit} className="nav-btn next-btn">
                Submit
                </button>
              ) : (
                <button onClick={handleNext} disabled={responses[currentQuestionIndex] === null} className="nav-btn next-btn">Next</button>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SurveyQuestions;