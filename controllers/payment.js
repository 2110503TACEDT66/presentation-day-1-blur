const Payment = require("../models/Payment");
// @desc    Get all
// @route   GET /api/v1/promotions
// @access  Public
exports.getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();

    res
      .status(200)
      .json({ success: true, count: payments.length, data: payments });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single promotion
// @route   GET /api/v1/promotions/:id
// @access  Public
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
