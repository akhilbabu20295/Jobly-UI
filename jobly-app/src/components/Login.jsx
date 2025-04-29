import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import CSS file

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    console.log("Email:", email, "Password:", password);
    alert("Login successful!");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign In</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
        Don't have an account? <Link to="/register">Sign Up</Link> 
        </p>
        <p className="signup-text">
        Forgot Password? <Link to="/reset-password">Reset Password</Link> 
        </p>
      </div>
    </div>
  );
}

export default Login;
