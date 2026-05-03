import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaignsData = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts"); // Replace with your actual API
        setCampaigns(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load campaigns.");
        setLoading(false);
      }
    };

    fetchCampaignsData();
  }, []);

  const logout = () => {
    alert("You have been logged out.");
    window.location.href = "/login"; // Redirect to the login page
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {loading && <p>Loading campaigns...</p>}
        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <div>
            <h1>Your Dashboard</h1>
            <h2>Campaign Overview</h2>
            {campaigns.length === 0 ? (
              <p>No campaigns found.</p>
            ) : (
              <div className="campaign-list">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="campaign-card">
                    <h2>{campaign.title}</h2>
                    <p>{campaign.description}</p>
                    <p>Goal: ${campaign.goal}</p>
                    <p>Funds Raised: ${campaign.funds}</p>
                    <button className="bu">Support Campaign</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
