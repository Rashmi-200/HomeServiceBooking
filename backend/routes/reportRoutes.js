const express = require("express");
const router = express.Router();
const { generatePDFReport, generateExcelReport } = require("../controllers/FinancialReportsController");

router.get("/pdf", generatePDFReport);
router.get("/excel", generateExcelReport);

module.exports = router;
