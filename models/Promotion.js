const mongoose = require("mongoose");

const dentalPromotionSchema = new mongoose.Schema({
  clinicName: {
    type: String,
    required: true,
    trim: true,
  },
  promotions: [
    {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3, // Enforce a minimum length for promotion names
      },
      description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10, // Enforce a minimum length for descriptions
      },
      regularPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      promotionalPrice: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: function (value) {
            return value < this.regularPrice; // Ensure promotional price is less than regular price
          },
          message: "Promotional price must be less than regular price",
        },
      },
      validFrom: {
        type: Date,
        required: true,
        get: (v) => v.toISOString().split("T")[0], // Format validFrom date for easier display (optional)
      },
      validTo: {
        type: Date,
        required: true,
        validate: {
          validator: function (value) {
            return value > this.validFrom;
          },
          message: "Valid To date must be after Valid From date",
        },
        get: (v) => v.toISOString().split("T")[0], // Format validTo date for easier display (optional)
      },
      termsAndConditions: {
        type: String,
        trim: true,
      },
      imageUrl: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: function (value) {
            const urlRegex =
              /^(http:\/\/|https:\/\/)?www\.[a-zA-Z0-9]+\.[a-z]{2,5}$/;
            return urlRegex.test(value);
          },
          message:
            'Invalid image URL. Please provide a valid URL starting with "http://" or "https://".',
        },
      },
    },
  ],
});

module.exports = mongoose.model("Promotion", dentalPromotionSchema);
