const Campaign = require("../models/Campaign");
const campaignData = require("../data/dummyCampaigns.json");

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    if (campaigns.length === 0) {
      await Campaign.insertMany(campaignData); // Insert dummy data on first run
    }
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};
