// src/components/Home.jsx
import React, { useState } from 'react';
import './Start.css'; // CSS 
import heroImage from '../assets/1.png'; // Hero Image
import projectImage1 from '../assets/1.png'; // Project Image 1
import projectImage2 from '../assets/2.png'; // Project Image 2
import projectImage3 from '../assets/3.png'; // Project Image 3

const Home = () => {
    // State variables for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    // Contact
    const handleSubmit = (e) => {
        e.preventDefault();
        setResponse(`Thank you, ${name}! Your message will be ignored.`); // Response 
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="home">
            {/* Image */}
            <div className="hero-image">
                <img src={heroImage} alt="Hero" className="hero-img" />
                <div className="hero-title">
                    <h1>Welcome to Savings App</h1>
                </div>
            </div>

            <header className="home-header">
                <h1>Save Smart, Live Better</h1>
                <p>Track your savings, set goals, and achieve financial freedom with ease.</p>
                <div className="home-buttons">
                    <a href="/login" className="button">Login</a>
                    <a href="/register" className="button">Get Started</a>
                </div>
            </header>

            {/* About Us */}
            <section className="about-us">
                <h2>About Us</h2>
                <p>We are dedicated to helping individuals achieve their financial goals through smart savings and budgeting tools.</p>
            </section>

            {/* Features */}
            <section className="features">
                <h2>Our Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <h3>Goal Tracking</h3>
                        <p>Set and track your savings goals to stay motivated.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Automated Savings</h3>
                        <p>Automatically save a portion of your income with our smart algorithms.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Insights & Analytics</h3>
                        <p>Get insights on your spending habits and savings progress.</p>
                    </div>
                </div>
            </section>

            {/* Contact Header */}
            <header className="contact-header">
                <h1>Contact Us</h1>
                <p>We take criticism well</p>
                {/* Button to scroll to contact form */}
                <a href="#contact-form" className="contact-button">Go to Contact Form</a>
            </header>

            {/* Reviews */}
            <section className="reviews">
                <h2>Reviews</h2>
                <div className="review-cards">
                    <div className="review-card">
                        <h3>Pavlova Tchaikovski</h3>
                        <p>"This app has changed my financial life!"</p>
                    </div>
                </div>
            </section>

            {/* Our Past Work Section */}
            <section className="past-work">
                <h2>Our Past Work</h2>
                <div className="past-work-images">
                    {/* Use imported images here */}
                    <img src={projectImage1} alt="Project 1" />
                    <img src={projectImage2} alt="Project 2" />
                    <img src={projectImage3} alt="Project 3" />
                </div>
                {/* New row for additional images */}
                <div className="past-work-images-row">
                    {/* Use imported images here */}
                    <img src={projectImage1} alt="Project 1" />
                    <img src={projectImage2} alt="Project 2" />
                    <img src={projectImage3} alt="Project 3" />
                </div>
            </section>

            {/* Contact Form Section */}
            <section id="contact-form" className="contact">
                <h2>Contact Us</h2>
                {response && <p>{response}</p>} {/* Display response*/}
                <form className="contact-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Your Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </section>

            {/* Footer Section */}
            <footer className="home-footer">
                <p>&copy; 2024 Savings App. All rights reserved.</p>
                {/* Social Media Links */}
                <div className="social-links">
                    <a href="https://twitter.com/ishowspeed" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com/blacknigga" target="_blank" rel="noopener noreferrer">Instagram</a>
                    {/* Add more links as needed */}
                </div>
            </footer>
        </div>
    );
};

export default Home;