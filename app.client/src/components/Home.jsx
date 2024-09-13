// src/components/LandingPage.jsx
import React from 'react';
import './Landing.css';

const LandingPage = () => {
    return (
        <div className="landing-page">
            <header className="hero">
                <h1>Start Saving Today with Our App</h1>
                <p>Achieve your financial goals with our powerful savings tools.</p>
                <div className="cta-buttons">
                    <a href="/register" className="button primary">Get Started</a>
                    <a href="/features" className="button secondary">Learn More</a>
                </div>
            </header>

            <section className="features">
                <h2>Key Features</h2>
                <div className="feature-grid">
                    <div className="feature">
                        <i className="fas fa-piggy-bank"></i>
                        <h3>Automatic Savings</h3>
                        <p>Set up recurring transfers to save effortlessly.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-chart-line"></i>
                        <h3>Progress Tracking</h3>
                        <p>Monitor your savings growth and stay motivated.</p>
                    </div>
                    <div className="feature">
                        <i className="fas fa-mobile-alt"></i>
                        <h3>Mobile App</h3>
                        <p>Save on the go with our user-friendly mobile app.</p>
                    </div>
                </div>
            </section>

            <section className="testimonials">
                <h2>What Our Users Say</h2>
                <div className="testimonial-carousel">
                    <div className="testimonial">
                        <p>"This app has helped me save more than ever before!"</p>
                        <p className="author">- John Doe</p>
                    </div>
                    <div className="testimonial">
                        <p>"The automatic savings feature is a game-changer!"</p>
                        <p className="author">- Jane Smith</p>
                    </div>
                    <div className="testimonial">
                        <p>"I love how easy it is to track my progress and stay motivated."</p>
                        <p className="author">- Michael Johnson</p>
                    </div>
                </div>
            </section>

            <footer>
                <p>&copy; 2023 Savings App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;