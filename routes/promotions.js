const express = require("express");
const { getPromotions, getPromotion } = require("../controllers/promotion");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getPromotions);

router.route("/:id").get(getPromotion);
module.exports = router;
