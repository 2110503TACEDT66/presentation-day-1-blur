const Payment = require('../models/Payment.js');
// @desc    Get all payments
// @route   GET /api/v1/payments
// @access  Public
exports.getPayments = async (req, res, next) => {
  try{
    const payments = await Payment.find();

    res.status(200).json({ success: true, count:payments.length, data:payments });
  }catch(err){
    res.status(400).json({success:false});
  }
  
};

// @desc    Get single payment
// @route   GET /api/v1/payments/:id
// @access  Public
exports.getPayment = async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if(!payment){
      return res.status(400).json({success: false});
    }
    res.status(200).json({success: true, data: payment});

  } catch (error) {
    res.status(400).json({success:false});
  }
  
};

// @desc    Create new payment
// @route   POST /api/v1/payments
// @access  Private
exports.createPayment = async (req, res, next) => {
  const payment = await Payment.create(req.body);
  res.status(201).json({
    success: true,
    data: payment
  });
};

// @desc    Update payment
// @route   PUT /api/v1/payments/:id
// @access  Private
exports.updatePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
      new : true,
      runValidators: true
    });

    if(!payment){
      return res.status(400).json({success:false});

    }
    res.status(200).json({success:true, data : payment});

  } catch (error) {
    res.status(400).json({success:false});
  }

};

// @desc    Delete payment
// @route   DELETE /api/v1/payments/:id
// @access  Private
exports.deletePayment = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if(!payment){
      return res.status(400).json({success: false});
    }

    res.status(200).json({success: true, data : {}});

  } catch (error) {
    res.status(400).json({success:false});
  }
};
