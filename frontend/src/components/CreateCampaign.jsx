import React, { useState } from "react";

const CreateCampaign = ({ addCampaign }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate form fields
    if (!title || !description || !goal || !endDate || !category) {
      setError("All fields are required!");
      return;
    }

    if (isNaN(goal) || goal <= 0) {
      setError("Please enter a valid goal amount.");
      return;
    }

    // Clear error message after validation
    setError("");

    // Prepare the new campaign data
    const newCampaign = {
      title,
      description,
      goal,
      funds: 0,
      endDate,
      category,
    };

    try {
      // Send the new campaign data to the backend
      const response = await fetch("https://fundzz-backend.onrender.com/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      });

      const data = await response.json();

      if (response.ok) {
        // Pass the newly created campaign to the parent component
        addCampaign(data.campaign); // Assuming the backend returns the created campaign in the 'campaign' field
        alert("Campaign created successfully!");
      } else {
        alert(data.message || "Failed to create campaign");
      }
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("An error occurred while creating the campaign.");
    }

    // Reset the form fields
    setTitle("");
    setDescription("");
    setGoal("");
    setEndDate("");
    setCategory("");
  };

  return (
    <div className="create-campaign-page">
      <h1>Create Campaign</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Campaign Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Campaign Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          type="number"
          placeholder="Funding Goal (in USD)"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Campaign End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Education">Education</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Environment">Environment</option>
          <option value="Technology">Technology</option>
        </select>
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
