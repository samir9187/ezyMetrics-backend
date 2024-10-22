const pdfService = require("../utils/pdfService");
const csvService = require("../utils/csvService");

exports.generateReport = (req, res) => {
  const { type, data } = req.body; // type can be 'pdf' or 'csv'

  if (type === "pdf") {
    const pdfBuffer = pdfService.generatePDF(data);
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  } else if (type === "csv") {
    const csvBuffer = csvService.generateCSV(data);
    res.setHeader("Content-Type", "text/csv");
    res.send(csvBuffer);
  } else {
    res.status(400).json({ message: "Invalid report type" });
  }
};
