require("dotenv").config();
const CampaignModel = require("./models/Campaign");
const LeadModel = require("./models/Lead");
const leadDataSet = require("./data/dummyLeads.json");
const campaignDataSet = require("./data/dummyCampaigns.json");
const mailer = require("./config/mail");

async function runETLProcess() {
  try {
    console.log("Starting data extraction...");

    const formattedLeads = leadDataSet.map((lead) => ({
      ...lead,
      source: lead.source.toUpperCase(),
    }));

    const formattedCampaigns = campaignDataSet.map((campaign) => ({
      ...campaign,
      status: campaign.status.toLowerCase(),
    }));

    // console.log("Formatted Data:", formattedLeads, formattedCampaigns);

    await LeadModel.insertMany(formattedLeads);
    await CampaignModel.insertMany(formattedCampaigns);

    console.log("Data successfully loaded into MongoDB!");

    if (formattedLeads.length > 150) {
      await notifyHighCount(formattedLeads.length, "lead");
    }

    if (formattedCampaigns.length > 150) {
      await notifyHighCount(formattedCampaigns.length, "campaign");
    }
  } catch (err) {
    console.error("ETL process encountered an error:", err);
  }
}

async function notifyHighCount(count, type) {
  const emailOptions = {
    from: process.env.EMAIL_USER,
    to: "darrensammy1000@example.com",
    subject: `EzyMetrics Alert: High ${type} Count Detected`,
    text: `Alert! The current ${type} count is: ${count}.`,
  };

  try {
    await mailer(emailOptions);
    console.log(`Notification email sent successfully for ${type} count!`);
  } catch (err) {
    console.error(`Error sending notification email for ${type} count:`, err);
  }
}

module.exports = runETLProcess;
