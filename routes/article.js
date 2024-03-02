const express = require("express");
const { getArticles, getArticle } = require("../controllers/article");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getArticles)
  // .post(protect, authorize("admin"), addArticle);
router
  .route("/:id")
  .get(protect, getArticle)
  // .put(protect, authorize("admin"), updateArticle)
  // .delete(protect, authorize("admin"), deleteArticle);;

module.exports = router;
