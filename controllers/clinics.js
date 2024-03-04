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
exports.createClinic = async (req, res, next) => {
  const clinic = await Clinic.create(req.body);
  res.status(201).json({
    success: true,
    data: clinic
  });
};

// @desc    Update clinic
// @route   PUT /api/v1/clinics/:id
// @access  Private
exports.updateClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(req.params.id, req.body, {
      new : true,
      runValidators: true
    });

    if(!clinic){
      return res.status(400).json({success:false});

    }
    res.status(200).json({success:true, data : clinic});

  } catch (error) {
    res.status(400).json({success:false});
  }

};

// @desc    Delete clinic
// @route   DELETE /api/v1/clinics/:id
// @access  Private
exports.deleteClinic = async (req, res, next) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);

    if(!clinic){
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data : {}});

  } catch (error) {
    res.status(400).json({success:false});
  }
};
