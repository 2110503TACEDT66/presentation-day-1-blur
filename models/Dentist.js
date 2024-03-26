const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema(
  {
    // Information specific to a dentist
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    yearsOfExperience: {
      type: Number,
      required: [true, "Please add the years of experience"],
      max: 50, // กำหนดค่าสูงสุด
      min:1,
    },
    areaOfExpertise: {
      type: String,
      required: [true, "Please specify the area of expertise"],
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Cascade delete appointment when a dentist is deleted
DentistSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Appointments being removed from dentist ${this._id}`);
    await this.model("Appointment").deleteMany({ dentist: this._id });
    next();
  }
);

//Reverse populate with virtuals
DentistSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "dentist",
  justOne: false,
});

module.exports = mongoose.model("Dentist", DentistSchema);
