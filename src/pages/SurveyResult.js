import React, { useEffect, useRef } from 'react';
import { Container, Navbar, ProgressBar } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './SurveyResult.css';
import logo from '../assets/agape-logo.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PDFReport from '../components/PDFReport';

const SurveyResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pdfRef = useRef();

  // Destructure all the data passed from the previous page
  const { result, name, age } = location.state || {};

  // Guard Clause: If there's no result data, redirect to the start
  useEffect(() => {
    if (!result || !name || !age) {
      navigate('/survey');
    }
  }, [result, name, age, navigate]);

  const handleRetakeTest = () => {
    navigate('/survey/start');
  };

  

  const handleDownloadPDF = async () => {
    const input = pdfRef.current;
    if(input) {
      try {
        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf=new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        })

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Agape_Personality_Report_${name}.pdf`);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
  };
  // If data is not ready, the useEffect above will redirect. Return null to prevent errors.
  if (!result) {
    return null;
  }

  // Calculate the total score to determine percentages for the progress bars
  const totalScore = Object.values(result.traits).reduce((sum, score) => sum + score, 0);

  return (
    <>
      <Navbar className="survey-header">
        <Container>
          <Navbar.Brand as={Link} to="/"><img src={logo} width="120" alt="AGAPE Logo" /></Navbar.Brand>
          <Navbar.Text className="header-tagline d-none d-md-block">India's First Personality Development School</Navbar.Text>
          <h2 className="survey-page-title">Agape <span>Surveys</span></h2>
        </Container>
      </Navbar>

      <div className="survey-result-page">
        <Container>
          <div className="result-box">
            <h1 className="result-title">Your Personality Insights Are Here!</h1>
            
            <div className="user-details">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Age:</strong> {age}</p>
              <p><strong>Dominant Trait:</strong> {result.dominantTrait.charAt(0).toUpperCase() + result.dominantTrait.slice(1)}</p>
            </div>

            <div className="traits-container">
              <h4>Trait Analysis:</h4>
              {/* Map over the traits object to display each one with a progress bar */}
              {Object.entries(result.traits).map(([trait, score]) => {
                const percentage = totalScore > 0 ? (score / totalScore) * 100 : 0;
                return (
                  <div className="trait-item" key={trait}>
                    <span className="trait-name">{trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
                    <ProgressBar now={percentage} className="trait-progress-bar" />
                    <span className="trait-score">{score}</span>
                  </div>
                );
              })}
            </div>

            <div className="insights-text">
              <p><strong>Suggestions:</strong></p>
              <ul>
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>

            <div className="action-buttons">
              <button className="action-btn retake-btn" onClick={handleRetakeTest}>Retake the Test</button>
              <button className="action-btn download-btn" onClick={handleDownloadPDF}>Download PDF</button>
            </div>
          </div>
        </Container>
      </div>
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        {result&& <PDFReport ref={pdfRef} name={name} age={age} result={result} />}
      </div>
    </>
  );
};

export default SurveyResult;