const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// API Routes

// Submit a review
app.post("/reviews", upload.single("image"), (req, res) => {
  const { name, type, reviewText, rating } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  // Mock database response
  const newReview = {
    id: Date.now(),
    name,
    type,
    reviewText,
    rating,
    imagePath,
  };

  console.log("New Review Submitted:", newReview);
  res.status(201).json({ message: "Review submitted successfully", newReview });
});

// Fetch reviews (mock data for now)
app.get("/reviews", (req, res) => {
  const mockReviews = [
    {
      id: 1,
      name: "Labadi Beach",
      type: "place",
      reviewText: "Amazing beach with great views!",
      rating: 4.5,
      imagePath: "/uploads/labadi.jpg",
    },
    {
      id: 2,
      name: "Frutelli",
      type: "product",
      reviewText: "Great taste .",
      rating: 4.0,
      imagePath: null,
    },
  ];
  res.json(mockReviews);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
