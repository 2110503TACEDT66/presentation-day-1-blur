const Clinic = require("../models/Clinic");
// @desc    Get all
// @route   GET /api/v1/promotions
// @access  Public
exports.getClinics = async (req, res, next) => {
  try {
    const clinics = await Clinic.find();

    res
      .status(200)
      .json({ success: true, count: clinics.length, data: clinics });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single promotion
// @route   GET /api/v1/promotions/:id
// @access  Public
exports.getClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: clinic });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
