const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");
const { protect, authorize } = require("../../middleware/auth");

const router = express.Router();

router.post("/add", protect, authorize(["admin"]), addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", protect, authorize(["admin"]), deleteFeatureImage);

module.exports = router;
