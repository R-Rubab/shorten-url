const express = require("express");
const urlRoute = require("./routes/url");
const URL = require("./models/url.js");
const { connectedMongooseDB } = require("./connection");

const app = express();
const PORT = 3000;

connectedMongooseDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongoose Connected!")
);

app.use(express.json());
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
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
});

app.listen(PORT, () => console.log(`Server Connected at PORT: ${PORT}`));
