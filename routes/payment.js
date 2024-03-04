const express = require("express");
const {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("admin"), getPayments)
  .post(protect, authorize("admin"), createPayment);

router
  .route("/:id")
  .get(protect, authorize("admin"), getPayment)
  .put(protect, authorize("admin"), updatePayment)
  .delete(protect, authorize("admin"), deletePayment);
module.exports = router;
