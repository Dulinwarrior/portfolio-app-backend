const express = require("express");
const cors = require("cors");
const helmet = require("helmet"); // Security middleware
const compression = require("compression"); // Compression middleware
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer"); // Import nodemailer for email functionality

const app = express();
const port = 5002;

// Middleware
app.use(helmet());
app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Middleware to parse JSON 
app.use(compression());

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Hardcoded data for "About Me"
const aboutMeData = {
  title: "About Me",
  intro: "Welcome to my personal space! Here's a little about me.",
  sections: [
    {
      imageUrl: "https://ai-techpark.com/wp-content/uploads/2023/02/5-Reasons-to-Be-Passionate-about-Coding.jpg",
      title: "Passion for Technology",
      description: "I love exploring new technologies and building exciting projects.",
    },
    {
      imageUrl: "https://www.findbanquet.com/blog/wp-content/uploads/2024/06/photographers.jpg",
      title: "Hobbies and Interests",
      description: "In my free time, I enjoy painting, hiking, and photography.",
    },
    {
      imageUrl: "https://gingermediagroup.com/wp-content/uploads/2022/09/Untitled-1-1024x576.jpg",
      title: "Future Goals",
      description: "My aim is to make a meaningful impact through innovation.",
    },
  ],
};

// Hardcoded data for "My Work"
const myWorkData = {
  header: "My Work",
  sections: [
    {
      title: "Exciting Web Development Projects",
      imageUrl: "https://www.creativeitinstitute.com/images/course/course_1663052056.jpg",
      description:
        "I am currently working on exciting projects that involve web development and software engineering. I'm always looking for ways to create more interactive and user-friendly web experiences.",
      buttonLabel: "Learn More",
    },
    {
      title: "Software Engineering Projects",
      imageUrl: "https://www.simplilearn.com/ice9/free_resources_article_thumb/IT_Engineer_Salary.jpg",
      description:
        "In addition to web development, I am also working on software engineering projects that help to improve performance and scalability of applications.",
      buttonLabel: "Learn More",
    },
  ],
};

// Route to get "About Me" data
app.get("/api/about-me", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/about-me`);
  res.json(aboutMeData);
});

// Route to get "My Work" data
app.get("/api/mywork", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/mywork`);
  res.json(myWorkData);
});

// 404 Not Found route
app.use((req, res) => {
  console.error(`[${new Date().toISOString()}] 404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const server = app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server running at http://localhost:${port}`);
});

// Graceful shutdown
const shutdown = () => {
  console.log("\nShutting down server...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
