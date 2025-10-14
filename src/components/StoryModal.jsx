import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './StoryModal.css';


const StoryModal = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <AnimatePresence>
      {/* The dark, semi-transparent overlay */}
      <motion.div
        className="modal-overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* The main modal content box */}
        <motion.div
          className="modal-content"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="modal-thumbnail">
            <img src={story.thumbnail} alt={story.title} />
            <div className="primary-actions">
              <Link to={`/stories/${story.slug}`} className="read-btn">Read Story</Link>
            </div>
          </div>

          <div className="modal-details">
            <h2>{story.title}</h2>
            <p>{story.description || "No description available. Dive in to discover the story within!"}</p>
            <div className="info-section">
              <h4>Info on this Story</h4>
              <p><span>Themes:</span> Courage, Friendship, Growth</p>
              <p><span>Reading Time:</span> Approx. 5 minutes</p>
            </div>
          </div>

          <button className="close-modal" onClick={onClose}>×</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryModal;