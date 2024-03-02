const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  // Information about the payment
  amount: {
    type: Number,
    required: true,
    min: 0.01, // Set a minimum payment amount
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "THB"], // Specify supported currencies
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["Cash", "Credit Card", "Debit Card"], // Specify supported payment methods
  },
  paymentDate: {
    type: Date,
    required: true,
    default: Date.now, // Set default date to current time
  },
  // Reference to the related Appointment (optional)
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment", // Reference the Appointment schema name
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "completed", "cancelled", "failed"], // Possible payment statuses
    default: "pending",
  },
  transactionId: {
    type: String,
    unique: true, // Ensure unique transaction IDs (optional)
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
