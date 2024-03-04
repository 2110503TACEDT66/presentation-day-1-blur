const express = require("express");
const {
  getClinics,
  getClinic,
  createClinic,
  updateClinic,
  deleteClinic,
} = require("../controllers/clinics");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(getClinics)
  .post(protect, authorize("admin"), createClinic);

router
  .route("/:id")
  .get(getClinic)
  .put(protect, authorize("admin"), updateClinic)
  .delete(protect, authorize("admin"), deleteClinic);
module.exports = router;
