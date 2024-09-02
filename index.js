const express = require("express");
const path = require("path");
const urlRoute = require("./routes/url");
const URL = require("./models/url.js");
const staticRoute = require("./routes/static_router.js");
const { connectedMongooseDB } = require("./connection");

const app = express();
const PORT = 3000;

connectedMongooseDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongoose Connected!")
);

app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));

// app.get("/test", async (req, res) => {
//   const allUrl = await URL.find({});
//   return res.render("home", {
//     urls: allUrl,
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
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
});

app.listen(PORT, () => console.log(`Server Connected at PORT: ${PORT}`));
