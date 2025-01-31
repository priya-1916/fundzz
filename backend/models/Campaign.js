const mongoose = require('mongoose');

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

module.exports = Campaign;
