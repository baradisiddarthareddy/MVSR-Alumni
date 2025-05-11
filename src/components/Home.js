import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home-container">

      {/* Header Section */}
      <header className="header">
        <div className="header-left">
          <img
            src='https://mvsrec.edu.in/images/logo.png'
            alt="College"
            className="college-logo"
          />
          <h1 className="college-name">MVSR Engineering College Alumni Portal</h1>
        </div>

        <div className="header-right">
          <Link to="/signup" className="btn-header">Sign Up</Link>
          <Link to="/signin" className="btn-header">Log In</Link>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="college-info">
        <div className="welcome-text">
          <h2>Welcome to the MVSR Alumni Network</h2>
          <p>
            This platform bridges the gap between current students and alumni. Alumni can share their
            experiences, guide students, and help them shape their careers. Let's build a stronger community together.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} MVSR Engineering College. All rights reserved.</p>
        <div className="footer-links">
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
      </footer>

    </div>
  );
}

export default Home;
