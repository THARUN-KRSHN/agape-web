import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Button, Navbar } from 'react-bootstrap';

// Imports for the PDF viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjs from 'pdfjs-dist';

import './StoryReaderPage.css';
import logo from '../assets/agape-logo.png';
import Footer from '../components/Footer';

const StoryReaderPage = () => {
    const { slug } = useParams();
    const [story, setStory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);

    // ✅ 1. Add state to track if the audio is playing
    const [isPlaying, setIsPlaying] = useState(false);

    // Create the dynamic worker URL for the PDF viewer
    const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    useEffect(() => {
        const fetchStoryDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://agapedjango.onrender.com/api/stories/${slug}/`);
                if (!response.ok) throw new Error('Story not found.');
                const data = await response.json();
                setStory(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStoryDetails();
    }, [slug]);

    // ✅ 2. Update the toggleAudio function to manage state
    const toggleAudio = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };
    
    // Effect to reset play state if audio finishes on its own
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleAudioEnd = () => setIsPlaying(false);
        audio.addEventListener('ended', handleAudioEnd);
        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [story]);


    if (isLoading) {
        return <div className="loading-container"><Spinner animation="border" /></div>;
    }
    if (error) {
        return <div className="error-container">{error}</div>;
    }

    return (
        <>
            <Navbar className="survey-header">
                <Container>
                    <Navbar.Brand as={Link} to="/"><img src={logo} width="120" alt="AGAPE Logo" /></Navbar.Brand>
                    <Navbar.Text className="header-tagline d-none d-md-block">India's First Personality Development School</Navbar.Text>
                    <h2 className="survey-page-title">Agape <span>Stories</span></h2>
                </Container>
            </Navbar>

            <main className="story-reader-page">
                <Container>
                    {story && (
                        <>
                            <div className="story-info-header">
                                <img src={story.cover_image} alt={story.title} className="story-info-thumb" />
                                <div className="story-info-text">
                                    <h1>{story.title}</h1>
                                    <p>{story.short_summary || (story.text && story.text.substring(0, 200) + '...')}</p>
                                </div>
                            </div>
                            <div className="story-controls">
                                {/* ✅ 3. Corrected this to be a React Bootstrap Button for routing */}
                                <Button as={Link} to="/stories" variant="light" className="control-btn">Back to Stories</Button>
                                {story.audiofile && (
                                    // ✅ 4. Update the button to show dynamic text
                                    <Button onClick={toggleAudio} variant="dark" className="control-btn">
                                        {isPlaying ? 'Pause Audio' : 'Play Audio'}
                                    </Button>
                                )}
                            </div>
                            <div className="pdf-viewer-container">
                                {story.file ? (
                                    <Worker workerUrl={workerUrl}>
                                        <Viewer fileUrl={story.file} />
                                    </Worker>
                                ) : (
                                    <div className="no-content-message"><p>Story content not available.</p></div>
                                )}
                            </div>
                        </>
                    )}
                </Container>
            </main>
            
            {story && story.audiofile && <audio ref={audioRef} src={story.audiofile} />}
            <Footer />
        </>
    );
};

export default StoryReaderPage;