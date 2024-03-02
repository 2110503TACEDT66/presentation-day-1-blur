const express = require("express");
const { getPayments, getPayment } = require("../controllers/payment");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getPayments);

router.route("/:id").get(getPayment);
module.exports = router;
