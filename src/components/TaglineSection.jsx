// src/components/TaglineSection.js

import React, { useRef } from 'react';
import { Container } from 'react-bootstrap';
import './TaglineSection.css';
// Import new hooks for scroll-linked animations
import { motion, useScroll, useTransform } from 'framer-motion';

const TaglineSection = () => {
  // A ref to attach to the main tall section
  const targetRef = useRef(null);
  
  // useScroll tracks scroll progress within the targetRef element
  // scrollYProgress will go from 0 to 1 as we scroll through the section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"], // Start tracking when bottom of viewport hits top of section
  });

  // useTransform maps the scrollYProgress (0 to 1) to an opacity value
  // We break the scroll progress into 4 parts for our 4 lines of text
  const opacityLine1 = useTransform(scrollYProgress, [0.1, 0.25], [0.2, 1]); // Fades in between 10% and 25% scroll
  const opacityLine2 = useTransform(scrollYProgress, [0.3, 0.45], [0.2, 1]); // Fades in between 30% and 45% scroll
  const opacityLine3 = useTransform(scrollYProgress, [0.5, 0.65], [0.2, 1]); // Fades in between 50% and 65% scroll
  const opacityLine4 = useTransform(scrollYProgress, [0.7, 0.85], [0.2, 1]); // Fades in between 70% and 85% scroll

  return (
    // This section is now much taller to create the "scroll canvas"
    <section ref={targetRef} className="tagline-section-sticky-wrapper">
      {/* This inner div is what becomes sticky */}
      <div className="sticky-container">
        <Container>
          <motion.h2 className="tagline-heading">
            {/* Each line is a motion component with its own opacity linked to the scroll */}
            <motion.span style={{ opacity: opacityLine1 }}>India's First</motion.span>
            <motion.span style={{ opacity: opacityLine2 }}>Personality</motion.span>
            <motion.span style={{ opacity: opacityLine3 }}>Development</motion.span>
            <motion.span style={{ opacity: opacityLine4 }}>School</motion.span>
          </motion.h2>
        </Container>
      </div>
    </section>
  );
};

export default TaglineSection;