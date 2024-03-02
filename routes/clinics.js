const express = require("express");
const { getClinics, getClinic } = require("../controllers/clinics");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getClinics);

router.route("/:id").get(getClinic);
module.exports = router;
