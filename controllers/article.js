const Article = require("../models/Article.js");
const Dentist = require("../models/Dentist")
// @desc    Get all articles
// @route   GET /api/v1/articles
// @access  Public
exports.getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();

    res
      .status(200)
      .json({ success: true, count: articles.length, data: articles });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

// @desc    Get single article
// @route   GET /api/v1/articles/:id
// @access  Public
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(400).json({ success: false });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};

//@desc Add Article
//@route GET /api/v1/hospitals/:hospitalId/Article
//@access Private

exports.addArticle = async (req, res, next) => {
  try {
    req.body.dentist = req.params.dentistId;

    const dentist = await Dentist.findById(req.params.dentistId);

    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: `No dentist with the id of ${req.params.dentistId}`,
      });
    }

    // add user Id to req.body
    req.body.user = req.user.id;

    // Check for existed Article
    const existedArticles = await Article.find({ user: req.user.id });

    // If the user is not an admin, they can only create 3 Articls.
    if (existedArticles.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 Articles`,
      });
    }

    const article = await article.create(req.body);

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)``
      .json({ success: false, message: "Cannot create Article" });
  }
};

// @desc    Update appointment
// @route   PUT /api/v1/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res, next) => {
  try {
    let Article = await Article.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No Article with the id of ${req.params.id}`,
      });
    }

    // Make sure user is the appointment owner
    if (article.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this Article`,
      });
    }

    article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot update Article",
    });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/v1/appointments/:id
// @access  Private
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `No appointment with the id of ${req.params.id}`,
      });
    }

    if (article.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this Article`,
      });
    }

    await article.deleteOne();
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete Article",
    });
  }
};
