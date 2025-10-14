import React from 'react';
import './PDFReport.css';
import logo from '../assets/agape-logo.png';

const PDFReport = React.forwardRef(({ result, name, age }, ref) => {
  const totalScore = Object.values(result.traits).reduce((sum, score) => sum + score, 0);

  return (
    <div ref={ref} className="pdf-container">
      <div className="pdf-header">
        <img src={logo} alt="AGAPE Logo" className="pdf-logo" />
        <h1 className="pdf-main-title">
          Agape <span>Surveys</span>
        </h1>
      </div>

      <div className="pdf-body">
        {/* New section for user details */}
        <div className="pdf-user-info">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Dominant Trait:</strong> {result.dominantTrait.charAt(0).toUpperCase() + result.dominantTrait.slice(1)}</p>
        </div>

        <div className="pdf-analysis-box">
          <h2 className="pdf-section-title">Trait Analysis:</h2>
          <div className="pdf-traits-container">
            {Object.entries(result.traits).map(([trait, score]) => {
              const percentage = totalScore > 0 ? (score / 100) * 100 : 0; // Assuming max score is 100
              return (
                <div className="pdf-trait-item" key={trait}>
                  <span className="pdf-trait-name">{trait.charAt(0).toUpperCase() + trait.slice(1)}</span>
                  <div className="pdf-progress-track">
                    <div className="pdf-progress-fill" style={{ width: `${score}%` }}></div>
                  </div>
                  <span className="pdf-trait-score">{score}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pdf-suggestions-box">
          <h2 className="pdf-section-title">Suggestions:</h2>
          <ul className="pdf-suggestions-list">
            {result.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pdf-footer">
        <p>India's First Personality Development School</p>
      </div>
    </div>
  );
});

export default PDFReport;