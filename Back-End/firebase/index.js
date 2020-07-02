const firebase = require("firebase");
const logger = require("../lib/helpers").logger;
// Required for side-effects
require("firebase/firestore");

var config;
try {
  if (process && process.env && process.env.FS_DB === "prod") {
    config = require("../firebase-config-prod.json");
  } else {
    config = require("../firebase-config.json");
  }

  firebase.initializeApp(config);

  let db = firebase.firestore();

  const settings = {};

  db.settings(settings);
  module.exports = db;
}
catch(err) {
  logger.error(err);
}
