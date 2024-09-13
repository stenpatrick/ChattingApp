// src/components/Landing.jsx
import React from 'react';
import './Landing.css'; // Import the specific CSS for the landing page

const Landing = () => {
    return (
        <div className="landing">
            <header>
                <h1>Welcome to Our Application</h1>
                <p>Your journey starts here. Explore our features and services.</p>
            </header>
            <div className="landing-buttons">
                <a href="/login" className="button">Login</a>
                <a href="/register" className="button">Register</a>
            </div>
        </div>
    );
};

export default Landing;