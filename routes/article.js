const express = require("express");
const {
  getArticles,
  getArticle
} = require("../controllers/article");

const router = express.Router();

//const {protect, authorize} = require('../middleware/auth');

router.route("/").get(getArticles);

router.route("/:id").get(getArticle);

module.exports = router;