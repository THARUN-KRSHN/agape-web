// StoryCard.js
import React from 'react';
import './StoryCard.css';

const StoryCard = ({ story, onClick }) => (
  <div className="story-card" onClick={onClick}>
    <div className="story-card-thumbnail">
      <img src={story.thumbnail} alt={story.title} />
    </div>
    <h3 className="story-card-title">{story.title}</h3>
  </div>
);
export default StoryCard;