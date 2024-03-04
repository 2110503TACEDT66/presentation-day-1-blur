const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  apptDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: "Dentist",
    required: true,
  },
  service: {
    type: String,
    required: true, // Adjust as needed
  },
  clinic: {
    type: mongoose.Schema.ObjectId,
    ref: "Clinic",
    required: true, // Adjust as needed
  },
  duration: {
    // Adjust data type based on your needs (e.g., Number, String)
    type: Number, // Example: duration in minutes
    required: true, // Adjust as needed
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
