const isObjectEmpty = function(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};
const winston = require('winston');
let logger  = winston;
// Imports the Google Cloud client library for Winston
if (process.env.NODE_ENV === "prod") {
  console.log("###Production Environment###");
  const {LoggingWinston} = require('@google-cloud/logging-winston');

  const loggingWinston = new LoggingWinston();
  
  // Create a Winston logger that streams to Stackdriver Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/winston_log"
  logger = winston.createLogger({
    level: 'info',
    transports: [
      new winston.transports.Console(),
      // Add Stackdriver Logging
      loggingWinston,
    ],
  });
} else {
  console.log("###Development Environment###");
}
module.exports = {
  isObjectEmpty,
  logger
};
