const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer"); // Import nodemailer for email functionality
const app = express();
const port = 5002;

app.use(cors()); // Enable CORS for frontend access
app.use(express.json()); // Middleware to parse JSON bodies

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

// Hardcoded data for "My School"
const mySchoolData = {
  title: "My School",
  imageUrl: "https://cdn.lyceum.lk/edgemedia/20240426182100/lyceum-wattala-complex.jpg.webp",
  about: {
    header: "About My School",
    description:
      "My school is an amazing place where we focus on academics, sports, and extracurricular activities. The teachers are very supportive, and the environment is conducive to learning. We have state-of-the-art facilities, including a modern library, science labs, and a sports complex.",
    buttonLabel: "Learn More",
  },
};

// Hardcoded data for "My Hometown"
const myHometownData = {
  title: "My Hometown",
  imageUrl: "https://www.e-architect.com/wp-content/uploads/2011/10/madiwela-house-sri-lanka-property.jpg",
  description: "My hometown is a place of rich culture and history. It is known for its beautiful landscapes and vibrant community. The streets are filled with lively markets and historical landmarks that tell the story of our heritage.",
};

// Hardcoded data for "My Hobbies"
const hobbiesData = {
  hobbies: [
    {
      title: "Photography",
      description: "Capturing beautiful moments and landscapes through my camera lens by drone.",
      image: "https://cdn.mos.cms.futurecdn.net/gvQ9NhQP8wbbM32jXy4V3j-1200-80.jpg",
    },
    {
      title: "Building LEGO",
      description: "Creating unique and creative structures.",
      image: "https://www.lego.com/cdn/cs/kids-lego-com/assets/blt3d1f203aac6e3332/Campaign_callout.jpg?quality=80&format=webply&width=2560",
    },
    {
      title: "Riding bicycle",
      description: "Exploring nature and riding my bicycle in rough terrain.",
      image: "https://www.herocycles.com/dw/image/v2/BGQH_PRD/on/demandware.static/-/Sites-HeroCycles-Library/default/dw70d14464/Blogs/Blog1/Blog1_Detailimg4.jpg?sh=659&sfrm=jpg&q=70",
    },
  ],
};

// Route to get "About Me" data
app.get("/api/about-me", (req, res) => {
  res.json(aboutMeData);
});

// Route to get "My Work" data
app.get("/api/mywork", (req, res) => {
  res.json(myWorkData);
});

// Route to get "My School" data
app.get("/api/my-school", (req, res) => {
  res.json(mySchoolData);
});

// Route to get "My Hometown" data
app.get("/api/hometown", (req, res) => {
  res.json(myHometownData);
});

// Route to get "My Hobbies" data
app.get("/api/hobbies", (req, res) => {
  res.json(hobbiesData);
});

// Route to handle contact form submissions
app.post("/api/contact", (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  // Configure nodemailer to send the message via email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com", // Replace with your email
      pass: "your-email-password", // Replace with your email password or app-specific password
    },
  });

  const mailOptions = {
    from: email,
    to: "your-email@gmail.com", // Replace with your email
    subject: "New Contact Form Message",
    text: `Message from: ${email}\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending email:", err);
      return res.status(500).json({ error: "Failed to send message. Please try again later." });
    }
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Message sent successfully!" });
  });
});

// Starting the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
