const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  author: {
    type: String, // Can be changed to ObjectId if authors are stored as separate documents
    required: true,
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false, // Initially set as unpublished
  },
  content: {
    type: String,
    required: true,
  },
  subheadings: {
    type: [String], // Stores subheadings as an array of strings
  },
  keywords: {
    type: [String], // Stores keywords as an array of strings
  },
  summary: {
    type: String,
    maxlength: [250, "Summary cannot exceed 250 characters"],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: (url) => {
        // Add validation logic for valid image URLs (e.g., using a regular expression)
        return true; // Replace with your validation logic
      },
      message: (props) => `${props.value} is not a valid image URL`,
    },
  },
});

module.exports = mongoose.model("Article", ArticleSchema);
