const express = require('express');
const mongoose = require('mongoose');
const Campaign = require('../models/Campaign'); // Assuming you have the Campaign schema in models folder

const router = express.Router();

// Route to create a campaign
router.post('/campaigns', async (req, res) => {
  try {
    const { title, description, goal, endDate, category } = req.body;
    const newCampaign = new Campaign({ title, description, goal, endDate, category });
    await newCampaign.save();
    res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to fetch all campaigns
router.get('/campaigns', async (req, res) => {
  try {
    const allCampaigns = await Campaign.find();
    res.status(200).json(allCampaigns);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update campaign funds
router.put('/campaigns/funds/:id', async (req, res) => {
  const { id } = req.params;
  const { funds } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid campaign ID' });
  }
  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { $inc: { funds: funds } },
      { new: true }
    );
    if (!updatedCampaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    res.status(200).json({ message: 'Funds updated successfully!', campaign: updatedCampaign });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
