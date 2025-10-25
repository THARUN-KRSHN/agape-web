import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Button, Navbar } from 'react-bootstrap';

// ✅ 1. Imports for react-pdf and react-pageflip ONLY
import HTMLFlipBook from 'react-pageflip';
import { Document, Page } from 'react-pdf';
// We assume pdfjs worker is configured globally in index.js

import './StoryReaderPage.css';
import logo from '../assets/agape-logo.png';
import Footer from '../components/Footer';

const StoryReaderPage = () => {
    const { slug } = useParams();
    const [story, setStory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [numPages, setNumPages] = useState(null);

    // No need for isMobileView state if flipbook is used for all sizes (adjust CSS later if needed)

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

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
    }

    const toggleAudio = async () => {
        if (!audioRef.current) return;
        if (audioRef.current.paused) {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Audio play failed:", error);
                setIsPlaying(false);
            }
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleAudioEnd = () => setIsPlaying(false);
        audio.addEventListener('ended', handleAudioEnd);
        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [story]);

    if (isLoading) return <div className="loading-container"><Spinner animation="border" /></div>;
    if (error) return <div className="error-container">{error}</div>;

    // Define dimensions for the flipbook (adjust as needed)
    const flipbookWidth = 450;
    const flipbookHeight = 600;

    return (
        <>
            <Navbar className="survey-header"> {/* Ensure class name is correct */}
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
                                <Button as={Link} to="/stories" variant="light" className="control-btn">Back to Stories</Button>
                                {story.audiofile && (
                                    <Button onClick={toggleAudio} variant="dark" className="control-btn">
                                        {isPlaying ? 'Pause Audio' : 'Play Audio'}
                                    </Button>
                                )}
                            </div>

                            {/* --- Use react-pdf + react-pageflip --- */}
                            <div className="pdf-viewer-container">
                                {story.file ? (
                                    <Document
                                        file={story.file}
                                        onLoadSuccess={onDocumentLoadSuccess}
                                        loading={<Spinner animation="border" />}
                                        className="pdf-document-hidden" // Keep this hidden
                                    >
                                        {numPages && (
                                            <HTMLFlipBook
                                                width={flipbookWidth}
                                                height={flipbookHeight}
                                                showCover={true}
                                                className="flipbook-container"
                                            >
                                                {Array.from(new Array(numPages), (el, index) => (
                                                    <div className="flipbook-page" key={`page_${index + 1}`}>
                                                        <Page
                                                            pageNumber={index + 1}
                                                            width={flipbookWidth}
                                                            renderTextLayer={false}
                                                            renderAnnotationLayer={false}
                                                        />
                                                    </div>
                                                ))}
                                            </HTMLFlipBook>
                                        )}
                                    </Document>
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