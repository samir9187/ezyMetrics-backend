const Lead = require("../models/Lead");
const leadsData = require("../data/dummyLeads.json");

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    if (leads.length === 0) {
      await Lead.insertMany(leadsData); // Insert dummy data on first run
    }
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};
