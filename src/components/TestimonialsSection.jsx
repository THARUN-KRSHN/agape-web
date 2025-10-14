// src/components/TestimonialsSection.js

import React from 'react';
import { Container } from 'react-bootstrap';
import './TestimonialsSection.css';
import { motion } from 'framer-motion';

const testimonials = [
  { quote: "\"AGAPE turned my shy child into a confident speaker!\"", author: "Deepa M.", role: "Parent" },
  { quote: "\"The classes are fun and I love learning with the mascot.\"", author: "Riya", role: "Student – Grade 5" },
  { quote: "\"At AGAPE, I made new friends and learned to lead.\"", author: "Arjun S.", role: "Student – Grade 7" },
  { quote: "\"The storytelling sessions are my favorite part of the week.\"", author: "Priya K.", role: "Student – Grade 4" },
];

// This creates a seamless loop by duplicating the testimonials
const duplicatedTestimonials = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  // Animation variant for the track
  const marqueeVariants = {
    animate: {
      x: [0, -100 * testimonials.length / duplicatedTestimonials.length + '%'], // Move from start to the end of the first set
      transition: {
        x: {
          repeat: Infinity, // Loop forever
          repeatType: "loop",
          duration: 40, // A long duration for a slow scroll
          ease: "linear", // No easing for a constant speed
        },
      },
    },
  };

  return (
    <section className="testimonials-section">
      <Container>
        <h2 className="testimonials-title">What Students & Parents Say</h2>
        <p className="testimonials-subtitle">Real voices, true growth.</p>
        
        {/* The outer container that hides the overflow */}
        <div className="testimonials-marquee">
          {/* The inner container that holds the cards and animates */}
          <motion.div 
            className="testimonials-track"
            variants={marqueeVariants}
            animate="animate"
          >
            {/* We map over the DUPLICATED array */}
            {duplicatedTestimonials.map((testimonial, index) => (
              <div className="testimonial-card-wrapper" key={index}>
                <div className="testimonial-card">
                  <p className="quote">{testimonial.quote}</p>
                  <p className="author">{testimonial.author}<br /><span>{testimonial.role}</span></p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;