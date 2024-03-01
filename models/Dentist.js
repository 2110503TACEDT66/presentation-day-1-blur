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
    },
    areaOfExpertise: {
      type: String,
      required: [true, "Please specify the area of expertise"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Cascade delete appointment when a hospital is deleted
HospitalSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model("Appointment").deleteMany({ hospital: this._id });
    next();
  }
);

//Reverse populate with virtuals
HospitalSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "hospital",
  justOne: false,
});

module.exports = mongoose.model("Hospital", HospitalSchema);
