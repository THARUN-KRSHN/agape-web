// StoryGrid.js
import React from 'react';
import StoryCard from './StoryCard';

const StoryGrid = ({ stories, onStoryClick }) => (
  <div className="story-grid">
    {stories.map(story => (
      <StoryCard key={story.id} story={story} onClick={() => onStoryClick(story)} />
    ))}
  </div>
);
export default StoryGrid;