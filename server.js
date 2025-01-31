const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer"); 
const app = express();
const port = 5002;

// Configure CORS with restrictions
const allowedOrigins = ["http://localhost:3000", "https://your-frontend.com"]; // Add your frontend URL here
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST",
    credentials: true,
  })
);

app.use(express.json()); 

// Hardcoded data
const aboutMeData = { /* Your About Me Data */ };
const myWorkData = { /* Your My Work Data */ };
const mySchoolData = { /* Your My School Data */ };
const myHometownData = { /* Your My Hometown Data */ };
const hobbiesData = { /* Your My Hobbies Data */ };

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

// Contact Form Route
app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    console.error(`[${new Date().toISOString()}] Validation Error: Missing fields`);
    return res.status(400).json({ error: "Email and message are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", 
      pass: "your-email-password", 
    },
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com", 
    subject: "New Contact Form Message",
    text: `Message from: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(`[${new Date().toISOString()}] Email Sending Error:`, err);
      return res.status(500).json({ error: "Failed to send message." });
    }
    console.log(`[${new Date().toISOString()}] Email sent successfully:`, info.response);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// Error handling for CORS issues
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    console.error(`[${new Date().toISOString()}] CORS Error:`, req.origin);
    res.status(403).json({ error: "CORS policy does not allow this request." });
  } else {
    next(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server running at http://localhost:${port}`);
});
