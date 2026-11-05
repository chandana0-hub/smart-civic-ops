const express = require("express");
const router = express.Router();

const Complaint = require("../models/Complaint");

// Submit a new complaint
router.post("/", async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      data: complaint
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      data: complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;