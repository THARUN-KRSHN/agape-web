import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Button, Navbar } from 'react-bootstrap';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
// ✅ 1. Import ONLY @react-pdf-viewer/core and pdfjs-dist
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjs from 'pdfjs-dist'; // Use the direct import

import './StoryReaderPage.css';
import logo from '../assets/agape-logo.png';
import Footer from '../components/Footer';

// ✅ 2. Define the worker URL using the imported pdfjs object
const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const StoryReaderPage = () => {
    const { slug } = useParams();
    const [story, setStory] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    // No need for numPages with this library

    const viewerContainerRef = useRef(null);
    // ✅ 2. Add state to control auto-scrolling
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    // Ref to store the interval ID
    const scrollIntervalRef = useRef(null);

    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

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

    const toggleAudio = async () => {
        if (!audioRef.current) return;

        // Check current state before issuing command
        if (audioRef.current.paused) {
            try {
                // ✅ Wait for the play() promise to resolve
                await audioRef.current.play();
                setIsPlaying(true);
                setIsAutoScrolling(true); // Start scrolling on play
            } catch (error) {
                // Handle errors if play() is interrupted or fails
                console.error("Audio play failed:", error);
                setIsPlaying(false);
                setIsAutoScrolling(false);
            }
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
            setIsAutoScrolling(false); // Stop scrolling on pause
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleAudioEnd = () => {
            setIsPlaying(false);
            setIsAutoScrolling(false); // Stop scrolling when audio ends
        };
        audio.addEventListener('ended', handleAudioEnd);
        return () => {
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [story]);

    useEffect(() => {
        if (isAutoScrolling && viewerContainerRef.current) {
            const container = viewerContainerRef.current.querySelector('.rpv-core__inner-pages'); // Target the inner scrollable div
            if (!container) return;

            // Clear any existing interval before starting a new one
            clearInterval(scrollIntervalRef.current);

            scrollIntervalRef.current = setInterval(() => {
                if (container.scrollTop < container.scrollHeight - container.clientHeight) {
                    container.scrollTop += 1; // Adjust this value (e.g., 0.5, 1, 2) for scroll speed
                } else {
                    // Stop scrolling if it reaches the bottom
                    setIsAutoScrolling(false);
                }
            }, 50); // Adjust interval timing (milliseconds) for scroll speed (lower = faster)

        } else {
            // Clear interval if auto-scrolling stops
            clearInterval(scrollIntervalRef.current);
        }

        // Cleanup function to clear interval on component unmount or when scrolling stops
        return () => {
            clearInterval(scrollIntervalRef.current);
        };
    }, [isAutoScrolling]); // Run this effect when isAutoScrolling changes

    if (isLoading) return <div className="loading-container"><Spinner animation="border" /></div>;
    if (error) return <div className="error-container">{error}</div>;

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

                            {/* --- ✅ Use @react-pdf-viewer/core --- */}
                            <div className="pdf-viewer-container" ref={viewerContainerRef}>
                                {story.file ? (
                                    <Worker workerUrl={workerUrl}>
                                        <Viewer fileUrl={story.file} plugins={[zoomPluginInstance]}/>
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