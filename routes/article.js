const express = require("express");
const {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} = require("../controllers/article");

const router = express.Router();

router.route("/").get(getArticles).post(createArticle);

router
  .route("/:id")
  .get(getArticle)
  .put(updateArticle)
  .delete(deleteArticle);

module.exports = router;