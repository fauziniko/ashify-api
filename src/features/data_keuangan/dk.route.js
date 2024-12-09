const express = require("express");
const {
  inputDataKeuangan,
  getHistoryData,
  getHistoryDetailsData,
} = require("./dk.controller");
const { authenticateToken } = require("../../global/auth.middleware");

const router = express.Router();

router.post("/:id_profile/input", authenticateToken, inputDataKeuangan);
router.get("/:id_profile/history", authenticateToken, getHistoryData);
router.get(
  "/history/:id_profile/:id_data/details",
  authenticateToken,
  getHistoryDetailsData
);

module.exports = router;
