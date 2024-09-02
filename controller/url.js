const URL = require("../models/url");
// const {nanoid} = require("nanoid");
const shortid = require("shortid");

async function handelGenerateNewUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  //   const shortId = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  // return res.json({ id: shortID });
  return res.render("home", { id: shortID });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({
    shortId,
  });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleGetByID(req, res) {
  const shortID = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortID,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

module.exports = {
  handelGenerateNewUrl,
  handleGetAnalytics,
  handleGetByID,
};
