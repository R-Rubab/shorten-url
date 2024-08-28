const express = require("express");
const router = express.Router();
const { handelGenerateNewUrl } = require("../controller/url");

// router.post("/",handelGenerateNewUrl);
router.post("/", handelGenerateNewUrl);

module.exports = router;
