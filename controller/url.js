const URL = require("../models/url");
// const nanoid = require("nanoid");
const shortid = require("shortid");

async function handelGenerateNewUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortId = shortid();
  //   const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectId: body.url,
    timestamp: [],
  });
  return res.json({ id: shortId });
}

module.exports = {
  handelGenerateNewUrl,
};
