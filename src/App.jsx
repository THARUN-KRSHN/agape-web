// Import React is no longer strictly necessary but good practice
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SurveyStart from './pages/SurveyStart';
import SurveyQuestions from './pages/SurveyQuestions';
import SurveyResult from './pages/SurveyResult';
import StoriesPage from './pages/StoriesPage';
import StoryReaderPage from './pages/StoryReaderPage';
import LoadingScreen from './components/LoadingScreen';
// Import the main CSS file for the App component
import './App.css';

/**
 * The main App component which acts as the root of our application.
 * It assembles the different sections of our page.
 */
function App() {
  const [isLoading, setIsLoading] = useState(true); // Start in loading state

  useEffect(() => {
    // Wait for 3 seconds, then hide the loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3000 milliseconds = 3 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this runs only once on mount

  // Conditionally render LoadingScreen or the main app
  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/survey/start" element={<SurveyStart />} />
          <Route path="/survey/questions" element={<SurveyQuestions />} />
          <Route path="/survey/result" element={<SurveyResult />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoryReaderPage />} />
          {/* Future routes can be added here */}
        </Routes>
        </div>
    </Router>
  );
}

export default App;