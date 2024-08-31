const express = require("express");
const router = express.Router();
const {
  handelGenerateNewUrl,
  handleGetAnalytics,
  handleGetByID,
} = require("../controller/url");

// router.post("/",handelGenerateNewUrl);
router.post("/", handelGenerateNewUrl);
router.post("/", handelGenerateNewUrl);

router.get("/analytics/:shortId", handleGetAnalytics);

// router.get("/:shortId", handleGetByID);

module.exports = router;
