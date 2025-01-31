import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from "react-router-dom"; // Import Navigate for redirection
import Home from "./components/Home";
import CreateCampaign from "./components/CreateCampaign";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import About from "./components/About";
import Campaigns from "./components/Campaigns"; // Ensure correct import

import "./index.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null); // State to track errors

  // Fetch campaigns from the backend when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:8002/campaigns"); // Changed to localhost
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCampaigns(data); // Set fetched campaigns into state
      } catch (error) {
        setError(error.message); // Capture error message
        console.error("Error fetching campaigns:", error); // Log the error
      }
    };

    fetchCampaigns();
  }, []);

  // Check for the authentication token when the component mounts
  useEffect(() => {
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setIsLoggedIn(true);
    }
  }, []); // This runs only once on initial load

  // Logout function
  const logout = () => {
    alert("You have been logged out.");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.href = "/login"; // This ensures redirection after logout
  };

  // Update the funds for a specific campaign
  const updateFunds = async (campaignId, newFunds) => {
    // Update funds in the state locally
    setCampaigns((prevCampaigns) =>
      prevCampaigns.map((campaign) =>
        campaign._id === campaignId ? { ...campaign, funds: newFunds } : campaign
      )
    );

    // Fetch the updated campaign data from the backend
    try {
      const response = await fetch("http://localhost:8002/campaigns"); // Changed to localhost
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCampaigns(data); // Update state with the fresh campaign data
    } catch (error) {
      console.error("Error fetching campaigns after update:", error);
    }
  };

  // Add a new campaign
  const addCampaign = (newCampaign) => {
    setCampaigns((prevCampaigns) => [
      ...prevCampaigns,
      { ...newCampaign, id: prevCampaigns.length + 1 }, // Generate new ID
    ]);
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <span className="fundzz">Fundzz</span>
          <div className="nav-links">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>Home</NavLink>

            {/* Only show these links if the user is logged in */}
            {isLoggedIn && (
              <>
                <NavLink to="/campaigns" className={({ isActive }) => (isActive ? "active-link" : "")}>View Campaigns</NavLink>
                <NavLink to="/create-campaign" className={({ isActive }) => (isActive ? "active-link" : "")}>Create Campaign</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>Dashboard</NavLink>
              </>
            )}

            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>About</NavLink>
          </div>
          {isLoggedIn && (
            <button className="logout-btn" onClick={logout}>Logout</button>
          )}
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/create-campaign" element={isLoggedIn ? <CreateCampaign addCampaign={addCampaign} /> : <Navigate to="/login" />} />
            <Route path="/campaigns" element={isLoggedIn ? <Campaigns campaigns={campaigns} updateFunds={updateFunds} /> : <Navigate to="/login" />} />

            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
