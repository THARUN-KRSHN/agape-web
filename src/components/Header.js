// Import React and necessary components from React Bootstrap
import './Header.css';
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

// Import your custom CSS for the header


// Import the logo image from your assets folder
import logo from '../assets/agape-logo.png'; // Make sure you have this image file

/**
 * The Header component renders the top navigation bar for the AGAPE platform.
 * It includes the brand logo and navigation links.
 */
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const Header = () => {
  return (
    // 'fixed-top' keeps the navbar visible at the top while scrolling
    <Navbar expand="lg" className="agape-nav">
      <Container>
        {/* The brand logo section */}
        <Navbar.Brand onClick={scrollToTop} style={{ cursor: 'pointer' }}className="nav-logo">
          {/* We use an img tag for the logo file */}
          <img
            src={logo}
            width="120" // Adjust width as needed
            height="auto" // Height will scale automatically
            className="d-inline-block align-top"
            alt="AGAPE Personality School Logo"
          />
        </Navbar.Brand>

        {/* This is the hamburger menu button for mobile view */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* This contains the collapsible navigation links */}
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {/* Each Nav.Link is a clickable navigation item */}
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#vision">Vision & Mission</Nav.Link>
            <Nav.Link href="#stories">Stories</Nav.Link>
            <Nav.Link href="#survey">Survey</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;