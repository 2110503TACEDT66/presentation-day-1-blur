
const Article = require('../models/Article');
// @desc    Get all articles
// @route   GET /api/v1/articles
// @access  Public
exports.getArticles = async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = {...req.query};

  //Fields to exclude
  const removeFields = ['select' , 'sort', 'page', 'limit'];

  //Loop over remove fields and delete them from reqQuery
  removeFields.forEach(param => delete reqQuery[param]);
  console.log(reqQuery)


  let queryStr = JSON.stringify(req.query);
  //Create operators($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    //select Fields
  if(req.query.select){
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  //Sort
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }else{
    query = query.sort('name');
  }
  //Pagination
  const page = parseInt(req.query.page,10)|| 1;
  const limit = parseInt(req.query.limit,10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page*limit;
  const total = await Article.countDocuments();

  query = query.skip(startIndex).limit(limit);


  try{
    //Executing query
    const articles = await query;
    //Pagination result
    const pagination = {};
    
    if(endIndex < total){
      pagination.next = {
        page:page + 1,
        limit
      }
    }

    if(startIndex > 0){
      pagination.prev = {
        page:page-1,
        limit
      }
    }

    res.status(200).json({ success: true, count:articles.length, pagination , data:articles });
  }catch(err){
    res.status(400).json({success:false});
  }
  
};





// @desc    Get single article
// @route   GET /api/v1/articles/:id
// @access  Public
exports.getarticle = async (req, res, next) => {
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

