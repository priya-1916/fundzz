const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware

app.use(express.json());
app.use(cors({
  origin: '*'})); // Parse JSON body data

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/New')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goal: { type: Number, required: true },
  funds: { type: Number, default: 0 },
  endDate: { type: Date, required: true },
  category: { type: String, required: true },
});

// Campaign Model
const Campaign = mongoose.model('Campaign', campaignSchema);

// Route to create a campaign
// Route to create a campaign
app.post('/api/campaigns', async (req, res) => {
  const { title, description, goal, endDate, category } = req.body;

  console.log('Received data:', req.body);  // Log the incoming request data

  try {
    const newCampaign = new Campaign({ title, description, goal, endDate, category });

    // Attempt to save the new campaign to the database
    await newCampaign.save();

    res.status(201).json({ message: 'Campaign created successfully!', campaign: newCampaign });
  } catch (error) {
    console.error('Error creating campaign:', error);  // Log the detailed error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});



// Route to fetch all campaigns
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.status(200).json(campaigns);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update campaign funds
// app.put('/api/campaigns/:id', async (req, res) => {
//   const { id } = req.params;
//   const { funds } = req.body;

//   // Validate the funds input
//   if (isNaN(funds) || funds <= 0) {
//     return res.status(400).json({ message: 'Invalid amount provided.' });
//   }

//   try {
//     const updatedCampaign = await Campaign.findByIdAndUpdate(id, { $inc: { funds: funds } }, { new: true });
//     if (!updatedCampaign) {
//       return res.status(404).json({ message: 'Campaign not found' });
//     }
//     res.status(200).json({ message: 'Funds updated successfully!', campaign: updatedCampaign });
//   } catch (error) {
//     console.error('Error updating campaign funds:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Route to update campaign funds without using ID in URL
// Route to update campaign funds without using ID in URL

app.put('/api/campaigns/funds/:id', async (req, res) => {
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
    console.error('Error updating campaign funds:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Campaign server is running on port ${PORT}`);
});
