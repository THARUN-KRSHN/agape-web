import React, { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './StoriesPage.css';

// Import all your sub-components
import StoryHero from '../components/StoryHero';
import StoryMarquee from '../components/StoryMarquee';
import StoryGrid from '../components/StoryGrid';
import Pagination from '../components/Pagination';
import StoryModal from '../components/StoryModal';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/agape-logo.png';

const StoriesPage = () => {
  const [allStories, setAllStories] = useState([]);
  const [filteredStories, setFilteredStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 15;

  const [selectedStory, setSelectedStory] = useState(null);

  // Fetch all stories on initial component mount
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("https://agapedjango.onrender.com/api/stories/");
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();

        // --- THIS IS THE KEY FIX ---
        // 1. We access the array from data.results.
        // 2. We map over it to create a clean data structure for our frontend.
        const formattedStories = data.results.map(story => ({
          id: story.id,
          title: story.title,
          description: story.short_summary, // Map short_summary to description
          thumbnail: story.cover_image,
          slug: story.slug,     // Map cover_image to thumbnail
        }));
        
        // Now we set our state with the clean, formatted array.
        setAllStories(formattedStories);
        setFilteredStories(formattedStories);

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStories();
  }, []);

  // Effect to filter stories when search term changes (no changes needed here)
  useEffect(() => {
    const results = allStories.filter(story =>
      story.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStories(results);
    setCurrentPage(1);
  }, [searchTerm, allStories]);

  // Pagination logic (no changes needed here)
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Modal logic (no changes needed here)
  const handleOpenModal = (story) => setSelectedStory(story);
  const handleCloseModal = () => setSelectedStory(null);

  return (
    <>
      <Navbar className="survey-header">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} width="120" alt="AGAPE Logo" className='survey-logo'/>
          </Navbar.Brand>
          <Navbar.Text className="header-tagline" as={Link} to="/">
            India's First Personality Development School
          </Navbar.Text>
        </Container>
      </Navbar>
      <main className="main-content">
        <StoryHero />
        {/* Pass the first 10-15 stories for a faster marquee load */}
        <StoryMarquee stories={allStories.slice(0, 15)} />

        <Container className="stories-content-area">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search tales that inspire..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>

          {isLoading ? (
            <div className="loading-container"><Spinner animation="border" /></div>
          ) : error ? (
            <div className="error-container">{error}</div>
          ) : (
            <StoryGrid stories={currentStories} onStoryClick={handleOpenModal} />
          )}

          <Pagination
            storiesPerPage={storiesPerPage}
            totalStories={filteredStories.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Container>
      </main>

      {selectedStory && (
        <StoryModal story={selectedStory} onClose={handleCloseModal} />
      )}
      
      <Footer />
    </>
  );
};

export default StoriesPage;