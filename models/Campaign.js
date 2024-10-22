const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    // enum: ["active", "completed", "upcoming"],
  },
});

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;
