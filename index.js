const express = require("express");
const urlRoute = require("./routes/url.js");
const connectedMongooseDB = require("./connection");

const app = express();
const PORT = 3000;

connectedMongooseDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongoose Connected!")
);

app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Connected at PORT: ${PORT}`));
