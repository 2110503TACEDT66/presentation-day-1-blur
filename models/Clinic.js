const mongoose = require("mongoose");

const ClinicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  service: [
    {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Clinic", ClinicSchema);
