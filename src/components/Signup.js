import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const validateRollNo = () => {
    const rollPattern = /^2451(\d{2})733\d{3}$/;
    if (!rollPattern.test(rollNo)) {
      return false;
    }

    const yearJoined = parseInt(rollNo.slice(4, 6));
    const currentYear = new Date().getFullYear() % 100;

    if (role === "student" && yearJoined > currentYear) {
      return false;
    }

    if (role === "alumni" && yearJoined + 4 > currentYear) {
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    const passPattern =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passPattern.test(password);
  };

  const handlesignup = async (e) => {
    e.preventDefault();

    if (!validateRollNo()) {
      alert("Invalid Roll Number format or year based on role.");
      return;
    }

    if (!validatePassword()) {
      alert(
        "Password must be at least 10 characters long, contain one uppercase letter, one number, and one special character."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:3600/api/signup", {
        role,
        rollNo,
        password,
      });
      console.log("result is", response);
      alert("Success! Redirected to Signin");
      navigate("/signin");
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <>
      <h1 className="home">
        <Link to="/" className="home-link">
          <img
            src="https://mvsrec.edu.in/images/logo.png"
            alt="MVSR Logo"
            className="college-logo"
          />
          MVSR Engineering College
        </Link>
      </h1>

      <div className="signupcontainer">
        <div className="signup-page">
          <div className="signup-left"></div>

          <div className="signup-right">
            <h1>Sign Up</h1>
            <div className="signup-form">
              <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Sign up</h2>
              <form onSubmit={handlesignup}>
                <label>Role:</label>
                <select
                  className="select-opt"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="alumni">Alumni</option>
                </select>

                <label>Roll No:</label>
                <input
                  type="text"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value)}
                  required
                  placeholder="e.g. 245121733067"
                />

                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="At least 10 chars incl. caps, num, special"
                />

                <button className="submitbtn" type="submit">
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
