// StoryMarquee.js
import React from 'react';
import { motion } from 'framer-motion';
import './StoryMarquee.css';

const StoryMarquee = ({ stories }) => {
  // To create a seamless loop, we duplicate the stories array
  const duplicatedStories = [...stories, ...stories];

  const marqueeVariants = {
    animate: {
      x: [0, '-50%'], // Move from the start to the end of the first set
      transition: { x: { repeat: Infinity, repeatType: "loop", duration: 80, ease: "linear" } },
    },
  };

  return (
    <div className="marquee-container">
      <motion.div className="marquee-track" variants={marqueeVariants} animate="animate">
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