const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


// Initialize the app
const app = express();
const PORT = process.env.PORT || 8002;

// Middleware
app.use(express.json());
app.use(cors("*"));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://priya:priya2007@cluster0.epuug.mongodb.net/New')
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

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
app.post('/campaigns', async (req, res) => {
  try {
    const { title, description, goal, endDate, category } = req.body;
    console.log('📥 Received data:', req.body);

    const newCampaign = new Campaign({ title, description, goal, endDate, category });
    await newCampaign.save();

    res.status(201).json({ message: '✅ Campaign created successfully!', campaign: newCampaign });
  } catch (error) {
    console.error('❌ Error creating campaign:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

// Route to fetch all campaigns
app.get('/campaigns', async (req, res) => {
  try {
    const allCampaigns = await Campaign.find();
    res.status(200).json(allCampaigns);
  } catch (error) {
    console.error('❌ Error fetching campaigns:', error);
    res.status(500).json({ message: '❌ Server error' });
  }
});

// Route to update campaign funds
app.put('/campaigns/funds/:id', async (req, res) => {
  const { id } = req.params;
  const { funds } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: '❌ Invalid campaign ID' });
  }

  try {
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { $inc: { funds: funds } },
      { new: true }
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: '❌ Campaign not found' });
    }

    res.status(200).json({ message: '✅ Funds updated successfully!', campaign: updatedCampaign });
  } catch (error) {
    console.error('❌ Error updating campaign funds:', error);
    res.status(500).json({ message: '❌ Server error', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Campaign server is running on http://localhost:${PORT}`);
});
