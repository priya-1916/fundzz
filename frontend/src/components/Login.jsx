import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState(""); // Use email instead of username
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email instead of username
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful!");
        localStorage.setItem("token", data.token); // Store token in localStorage
        setIsLoggedIn(true); // Update login status in parent component
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Handle email input
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Login</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
