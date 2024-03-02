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
      },
      description: {
        type: String,
        required: true,
        trim: true,
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
      },
      termsAndConditions: {
        type: String,
        trim: true,
      },
      imageUrl: {
        type: String,
        validate: {
          validator: function (value) {
            // Basic URL validation using regular expression
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
