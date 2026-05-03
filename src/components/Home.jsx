import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Fundzz</h1>
          <p className="c">Your platform for launching impactful campaigns.</p>
          <Link to="/create-campaign" className="cta-button">Start Your Campaign</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/73/94/2d/73942d5ef90a8a5b2e46741507f97406.jpg" alt="Feature 1" />
            <h3>Easy Setup</h3>
            <p>Set up your campaign with just a few clicks.</p>
          </div>
          <div className="feature-card">
            <img src="https://i.pinimg.com/736x/df/60/47/df6047e461a4998feb1a673d64690cf1.jpg" alt="Feature 2" />
            <h3>Reach More People</h3>
            <p>Our platform helps you reach a wider audience.</p>
          </div>
          <div className="feature-card">
            <img src="https://i.pinimg.com/474x/86/71/a5/8671a57d5ab63296924f283208b60293.jpg" alt="Feature 3" />
            <h3>Track Progress</h3>
            <p>Monitor your campaign’s performance in real-time.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Fundzz helped me raise more funds than I expected. The process was seamless!"</p>
            <h4>John Doe</h4>
          </div>
          <div className="testimonial-card">
            <p>"A fantastic platform! I was able to launch my campaign in no time."</p>
            <h4>Jane Smith</h4>
          </div>
        </div>
      </section>

      {/* User Authentication Section */}
      <section className="authentication">
        <h2>Join Fundzz Today</h2>
        <div className="auth-buttons">
          <Link to="/signup" className="signup-button">Sign Up</Link>
          <Link to="/login" className="login-button">Login</Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer>
        <div className="footer-content">
          <p>&copy; 2025 Fundzz. All Rights Reserved.</p>
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
