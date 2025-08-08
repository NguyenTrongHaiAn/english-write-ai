// src/components/LandingPage.jsx

import React from 'react';
import './landingpage.css';
import { Link } from 'react-router-dom'; // <-- BƯỚC 1: IMPORT LINK

function LandingPage() {
  const title = "Improve your English writing skill";

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>
          {"Improve your English writing skill".split(" ").map((word, i) => (
          <span key={i} className="word" style={{ animationDelay: `${i * 0.15}s` }}>
            {word}&nbsp;
          </span>
        ))}
        </h1>

        <p className="slide-in-text">
Evaluate IELTS essays, CVs, and other written documents with precision. Receive in-depth feedback to improve clarity, accuracy, and professionalism in your writing.        </p>

        <div className="cta-button-wrapper">
          <Link to="/skills"><button className="cta-button slide-in-text">
            GET STARTED
          </button></Link>
          
        </div>
        
      </div>

      <div className="landing-img">
        <img src="/assets/landingpage.png" alt="landing" />
      </div>
    </div>
  );
}

export default LandingPage;
