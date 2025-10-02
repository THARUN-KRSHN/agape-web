import React from 'react';
import { Container } from 'react-bootstrap';
import './MissionSection.css';

const MissionSection = () => {
  return (
    <section id="vision" className="mission-section">
      <Container>
        <div className="mission-box">
          <h3>Vision & Mission</h3>
          <p>
            To cultivate a generation of confident, empathetic, and self-aware leaders by providing a nurturing, science-backed learning environment that inspires lifelong personal growth.
          </p>
        </div>

        <div className="mission-box">
          <h3>Our Core Mission</h3>
          <p>
            To deliver interactive, small-batch personality development programs for children, combining the warmth of a homely learning space with measurable, meaningful outcomes that empower both learners and parents.
          </p>
          <p>
            We believe in every child’s ability to create positive change. At AGAPE, we provide the foundation, guidance, and encouragement for each journey.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default MissionSection;