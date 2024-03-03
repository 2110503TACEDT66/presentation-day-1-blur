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
