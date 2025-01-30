import React, { useState, useEffect } from "react";


const Campaigns = ({ campaigns = [], updateFunds }) => {
  const [supportAmounts, setSupportAmounts] = useState(
    campaigns.map(() => "")
  );

  useEffect(() => {
    setSupportAmounts(campaigns.map(() => ""));
  }, [campaigns]);

  const handleInputChange = (index, value) => {
    const updatedSupportAmounts = [...supportAmounts];
    updatedSupportAmounts[index] = value;
    setSupportAmounts(updatedSupportAmounts);
  };

  const handleSupport = async (index) => {
    const amount = parseFloat(supportAmounts[index]);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const campaignId = campaigns[index]._id;
    console.log("Sending Campaign ID:", campaignId);

    try {
      const response = await fetch(`http://localhost:8001/api/campaigns/funds/${campaignId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ funds: amount }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedCampaigns = campaigns.map((campaign, idx) =>
          idx === index ? { ...campaign, funds: campaign.funds + amount } : campaign
        );

        setSupportAmounts((prev) => prev.map((val, idx) => (idx === index ? "" : val)));
        updateFunds(updatedCampaigns);
        alert(data.message || 'Funds updated successfully!');
      } else {
        alert(data.message || 'Failed to update the campaign');
      }
    } catch (error) {
      console.error("Error updating funds:", error);
      alert("Failed to update the campaign. Please try again.");
    }
  };

  return (
    <div className="campaigns-container">
      <h1>Campaigns</h1>
      {campaigns.map((campaign, index) => (
        <div key={campaign._id || index} className="campaign-card">
          <h2>{campaign.title}</h2>
          <p>{campaign.description}</p>
          <div className="info">
            <p>Goal: ${campaign.goal}</p>
            <p>Funds Raised: ${campaign.funds}</p>
            <p>Category: {campaign.category}</p>
          </div>
          <input
            type="number"
            placeholder="Enter amount"
            value={supportAmounts[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button onClick={() => handleSupport(index)}>Support</button>
        </div>
      ))}
    </div>
  );
};

export default Campaigns;
