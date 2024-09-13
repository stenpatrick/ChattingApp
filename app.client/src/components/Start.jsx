// src/components/Home.jsx
import React from 'react';
import './Start.css'; // Import the specific CSS for the home page

const Home = () => {
    return (
        <div className="home">
            <header className="home-header">
                <h1>Save Smart, Live Better</h1>
                <p>Track your savings, set goals, and achieve financial freedom with ease.</p>
                <div className="home-buttons">
                    <a href="/login" className="button">Login</a>
                    <a href="/register" className="button">Get Started</a>
                </div>
            </header>
            <section className="features">
                <h2>Features</h2>
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
            <footer className="home-footer">
                <p>&copy; 2024 Savings App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;