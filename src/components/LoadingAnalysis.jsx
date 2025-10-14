// src/components/LoadingAnalysis.js
import React from 'react';
import './LoadingAnalysis.css';

const LoadingAnalysis = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="pulsating-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <p className="loading-text">Analyzing your responses...</p>
      </div>
    </div>
  );
};

export default LoadingAnalysis;