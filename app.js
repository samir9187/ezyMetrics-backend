require("dotenv").config();
const express = require("express");
const leadsData = require("./data/dummyLeads.json");
const campaignsData = require("./data/dummyCampaigns.json");
const connectDB = require("./config/db");
const executeETLProcess = require("./ExtractTransformLoad.js");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");
const LeadModel = require("./models/Lead");
const CampaignModel = require("./models/Campaign");

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/crm/leads", (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: leadsData,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/marketing/campaigns", (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: campaignsData,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/report/pdf", async (req, res) => {
  try {
    const doc = new PDFDocument();
    const pdfFilePath = "report.pdf";

    if (fs.existsSync(pdfFilePath)) fs.unlinkSync(pdfFilePath);

    const writeStream = fs.createWriteStream(pdfFilePath);
    doc.pipe(writeStream);

    doc.fontSize(18).text("EzyMetrics Report", { align: "center" }).moveDown();
    doc.fontSize(14).text("Leads Data:");
    doc.fontSize(12).text(JSON.stringify(leadsData, null, 2)).moveDown();
    doc.fontSize(14).text("Campaigns Data:");
    doc.fontSize(12).text(JSON.stringify(campaignsData, null, 2));
    doc.end();

    writeStream.on("finish", () => {
      res.download(pdfFilePath, "EzyMetrics_Report.pdf", (error) => {
        if (error) {
          return res
            .status(500)
            .json({ status: "error", message: error.message });
        }
      });
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/report/csv", async (req, res) => {
  try {
    const csvFilePath = "report.csv";
    if (fs.existsSync(csvFilePath)) fs.unlinkSync(csvFilePath);

    const csvWriter = createObjectCsvWriter({
      path: csvFilePath,
      header: [
        { id: "leadId", title: "Lead ID" },
        { id: "name", title: "Name" },
        { id: "email", title: "Email" },
        { id: "source", title: "Source" },
      ],
    });

    const leadsList = await LeadModel.find({});
    if (!leadsList.length) {
      return res
        .status(404)
        .json({ status: "error", message: "No leads found" });
    }

    await csvWriter.writeRecords(leadsList);
    res.download(csvFilePath);
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      executeETLProcess();
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
