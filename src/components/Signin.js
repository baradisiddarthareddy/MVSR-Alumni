import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signin.css';

const Signin = () => {
  const [rollNo, setRollNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3600/api/signin", { rollNo, password });
      console.log("response is", result.data);
      localStorage.setItem('token', result.data);
      navigate('/dashboard');
    } catch (error) {
      alert("Login failed. Please check your roll number and password.");
    }
  };

  return (
  
    
    <>
      
      <Link to="/" className="home-link">
          <img src="https://mvsrec.edu.in/images/logo.png" alt="MVSR Logo" className="college-logo" />
          
      </Link>
      

      <div className="login-page">
        <div className="login-container">
          <h1>Login In to Continue</h1>
          <form className="login-form" onSubmit={handleLogin}>
            <label>Roll No:</label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <p className="signup-link">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
