const Promotion = require("../models/Promotion");
// @desc    Get all
// @route   GET /api/v1/promotions
// @access  Public
exports.getPromotions = async (req, res, next) => {
  try {
    const promotions = await Promotion.find();

    res
      .status(200)
      .json({ success: true, count: promotions.length, data: promotions });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single promotion
// @route   GET /api/v1/promotions/:id
// @access  Public
exports.getPromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findById(req.params.id);

    if (!promotion) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: promotion });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
exports.createPromotion = async (req, res, next) => {
  const promotion = await Promotion.create(req.body);
  res.status(201).json({
    success: true,
    data: promotion
  });
};

// @desc    Update promotion
// @route   PUT /api/v1/promotions/:id
// @access  Private
exports.updatePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndUpdate(req.params.id, req.body, {
      new : true,
      runValidators: true
    });

    if(!promotion){
      return res.status(400).json({success:false});

    }
    res.status(200).json({success:true, data : promotion});

  } catch (error) {
    res.status(400).json({success:false});
  }

};

// @desc    Delete promotion
// @route   DELETE /api/v1/promotions/:id
// @access  Private
exports.deletePromotion = async (req, res, next) => {
  try {
    const promotion = await Promotion.findByIdAndDelete(req.params.id);

    if(!promotion){
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data : {}});

  } catch (error) {
    res.status(400).json({success:false});
  }
};


