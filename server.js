const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const app = express();
const port = 5002;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(morgan("combined")); // Logging requests

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Hardcoded data
const aboutMeData = { /* Data unchanged */ };
const myWorkData = { /* Data unchanged */ };
const mySchoolData = { /* Data unchanged */ };
const myHometownData = { /* Data unchanged */ };
const hobbiesData = { /* Data unchanged */ };

// Routes
app.get("/api/about-me", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/about-me`);
  res.json(aboutMeData);
});

app.get("/api/mywork", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/mywork`);
  res.json(myWorkData);
});

app.get("/api/my-school", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/my-school`);
  res.json(mySchoolData);
});

app.get("/api/hometown", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/hometown`);
  res.json(myHometownData);
});

app.get("/api/hobbies", (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/hobbies`);
  res.json(hobbiesData);
});

app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;
  if (!email || !message) {
    console.error(`[${new Date().toISOString()}] Validation Error: Missing fields - Received: ${JSON.stringify(req.body)}`);
    return res.status(400).json({ error: "Email and message are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: "your-email@gmail.com", pass: "your-email-password" }
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com",
    subject: "New Contact Form Message",
    text: `Message from: ${email}\n\n${message}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Email Sending Error: ${JSON.stringify(err, null, 2)}`);
      return res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
    console.log(`[${new Date().toISOString()}] Email sent successfully:`, info.response);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// 404 Not Found Route
app.use((req, res) => {
  console.log(`[${new Date().toISOString()}] 404 Not Found: ${req.originalUrl}`);
  res.status(404).json({ error: "Not Found" });
});

// Graceful Shutdown Handling
const server = app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server running at http://localhost:${port}`);
});

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\nGracefully shutting down...");
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
});
