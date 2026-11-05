require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./services/database");
const complaintRoutes = require("./routes/complaints");

const app = express();

app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CivicFlow AI!",
    status: "Backend is running successfully"
  });
});

// Complaint routes
app.use("/api/complaints", complaintRoutes);
app.get("/api/test", (req, res) => {
  res.send("API route is working!");
});
console.log("Complaint routes loaded successfully!");


// Start server after database connection
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`CivicFlow AI running on port ${PORT}`);
  });
};

startServer();
