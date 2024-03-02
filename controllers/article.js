const Article = require('../models/Article.js');
// @desc    Get all articles
// @route   GET /api/v1/articles
// @access  Public
exports.getArticles = async (req, res, next) => {
  try{
    const articles = await Article.find();

    res.status(200).json({ success: true, count:articles.length, data:articles });
  }catch(err){
    res.status(400).json({success:false});
  }
  
};

// @desc    Get single article
// @route   GET /api/v1/articles/:id
// @access  Public
exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);

    if(!article){
      return res.status(400).json({success: false});
    }
    res.status(200).json({success: true, data: article});

  } catch (error) {
    res.status(400).json({success:false});
  }
  
};