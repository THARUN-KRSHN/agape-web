// Import React is no longer strictly necessary but good practice
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SurveyStart from './pages/SurveyStart';
import SurveyQuestions from './pages/SurveyQuestions';
import SurveyResult from './pages/SurveyResult';
// Import the main CSS file for the App component
import './App.css';

/**
 * The main App component which acts as the root of our application.
 * It assembles the different sections of our page.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey/start" element={<SurveyStart />} />
          <Route path="/survey/questions" element={<SurveyQuestions />} />
          <Route path="/survey/result" element={<SurveyResult />} />
          {/* Future routes can be added here */}
        </Routes>
        </div>
    </Router>
  );
}

export default App;