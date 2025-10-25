import React from 'react';
import { motion } from 'framer-motion';
import './StoryMarquee.css';

const StoryMarquee = ({ stories }) => {
  // Duplicate stories for seamless looping
  const duplicatedStories = [...stories, ...stories];

  return (
    <div className="marquee-container">
      <motion.div
        className="marquee-track"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 80,
          ease: 'linear',
        }}
      >
        {duplicatedStories.map((story, index) => (
          <div className="marquee-item" key={index}>
            <img src={story.thumbnail} alt="" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default StoryMarquee;