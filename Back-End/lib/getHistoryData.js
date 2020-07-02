const firestore = require("../firebase");
const logger = require("./helpers").logger;
/**---------getHistoryData--------------
 * return data(files, codes, langs) for specific project and version
 */

/**--------Parameters (inside of body)------------
 * projectID: string representing the project
 * version: string representing the version(time)
 */

const getHistoryData = async function(projectID,version) {
  if (!projectID || !version) {
    logger.error("No Project ID or Time provided for getHistoryData function, Exiting");
    return { ok: false, error: "No Project ID or Time provided" };
  }
  try {
    // update existing project with data
    let getDoc = await firestore.collection("/projects").doc(projectID).get();
    var history = (getDoc.data().histories ? getDoc.data().histories : {});
    return { uid: getDoc.data().uid, historydata: history[version], id: projectID, name: getDoc.data().name};
  }
  catch(err) {
    logger.error(err);
  }
};
module.exports = getHistoryData;
