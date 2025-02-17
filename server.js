const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 5002;

// Enable CORS and JSON parsing middleware
app.use(cors());
app.use(express.json());

// Hardcoded data for /api/my-school endpoint
const mySchoolData = {
  title: "My Amazing School",
  imageUrl: "https://cdn.lyceum.lk/edgemedia/20240426182100/lyceum-wattala-complex.jpg",
  about: {
    header: "About Our School",
    description:
      "Our school is known for its outstanding education and vibrant community. We prioritize student success and holistic development.",
    buttonLabel: "Learn More",
  },
};

// Hardcoded data for /api/mywork endpoint
const myWorkData = {
  title: "My Work",
  description: "This is a sample project involving school data and APIs.",
  tasks: [
    {
      id: 1,
      name: "Task 1",
      status: "Completed",
    },
    {
      id: 2,
      name: "Task 2",
      status: "In Progress",
    },
  ],
};

// Get the /api/my-school data
app.get("/api/my-school", (req, res) => {
  res.json(mySchoolData);
});

// Get the /api/mywork data
app.get("/api/mywork", (req, res) => {
  res.json(myWorkData);
});

// Example of another existing route
app.get("/api/status", (req, res) => {
  res.json({ status: "Server is running" });
});

// Get the /api/mywork data (with file handling)
const myWorkFilePath = "./mywork.json";

// Load data from mywork.json file (for demonstration purposes)
app.get("/api/mywork-old", (req, res) => {
  fs.readFile(myWorkFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading mywork.json:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(JSON.parse(data));
  });
});

// Save or update mywork.json file (for demonstration purposes)
app.post("/api/mywork-old", (req, res) => {
  fs.writeFile(myWorkFilePath, JSON.stringify(req.body, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing to mywork.json:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ message: "Data saved successfully" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
