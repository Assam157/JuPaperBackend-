const app = require("express");
const app1 = app();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MongoDB = require("./MongoDB/MongoDB");
const Papers = require("./models/PaperModel");
const cors = require("cors");

app1.use(cors());

app1.use(bodyParser.json()); // Middleware to parse JSON bodies

app1.listen(3000, function () {
  console.log("This port is listening");
});

// Home route
app1.get("/", function (req, res) {
  res.status(200).json({ success: true, message: "Home route has been reached" });
});

// Endpoint to post a paper
app1.post("/post-paper", async function (req, res) {
  try {
    const { title, author, year, abstract, url, department } = req.body;

    // Validate the input
    if (!title || !author || !year || !abstract || !url || !department) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create a new paper
    const newPaper = new Papers({
      title,
      author,
      year,
      abstract,
      url,
      department, // Add the department field
    });

    // Save the paper to the database
    await newPaper.save();

    res.status(201).json({
      success: true,
      message: "Paper added successfully",
      data: newPaper,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
});

// Endpoint to get all papers
app1.get("/get-papers", async function (req, res) {
  try {
    // Fetch all papers from the database
    const papers = await Papers.find();

    // Respond with the papers
    res.status(200).json({
      success: true,
      message: "Papers fetched successfully",
      data: papers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred", error: error.message });
  }
});
