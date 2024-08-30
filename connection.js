const mongoose = require("mongoose");

async function connectedMongooseDB(url) {
  return mongoose.connect(url);
}

module.exports = {connectedMongooseDB};
