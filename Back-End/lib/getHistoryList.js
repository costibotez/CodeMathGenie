const firestore = require("../firebase");
const logger = require("./helpers").logger;

/**---------getHistoryList--------------
 * return list of history for certain project
 */

/**--------Parameters (inside of body)------------
 * projectID: string representing the project
 */

const getHistoryList = async function(projectID) {
  if (!projectID) {
    logger.error("No Project ID provided for getHistoryList, Exiting");
    return { ok: false, error: "No Project ID provided" };
  }
  try {
    // update existing project with data
    let getDoc = await firestore.collection("/projects").doc(projectID).get();
    var history = (getDoc.data().histories ? getDoc.data().histories : {});
    return { historylist: Object.keys(history)};
  }
  catch(err) {
    logger.error(err);
  }
};
module.exports = getHistoryList;
