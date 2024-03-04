const express = require("express");
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/articles");

const router = express.Router();
const {protect, authorize}  = require('../middleware/auth');

router.route("/").get(getArticles)
                 .post(protect, authorize('admin') ,createArticle);

router
  .route("/:id")
  .get(getArticle)
  .put(protect, authorize('admin') ,updateArticle)
  .delete(protect,authorize('admin') ,deleteArticle);

module.exports = router;

