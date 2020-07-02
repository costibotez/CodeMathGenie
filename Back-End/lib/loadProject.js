const firestore = require("../firebase");
const logger = require("./helpers").logger;

/**---------loadProject--------------
 * return data(files, codes, langs, name) for project
 */

/**--------Parameters (inside of body)------------
 * projectID: string representing the project
 * version: string representing the version(time)
 */

const loadProject = async function(projectID) {
  if (!projectID) {
    logger.error("No Project ID provided in loadProject function, Exiting");
    return { ok: false, error: "No Project ID  provided" };
  }
  try {
    // update existing project with data
    let getDoc = await firestore.collection("/projects").doc(projectID).get();
    if (!getDoc.exists) {
      logger.error("No Project with that ID executing loadProject, Exiting");
      return { ok: false, error: "No Project with that ID" };
    }
    const history = (getDoc.data().histories ? getDoc.data().histories : {});
    const latest = getDoc.data().latest;
    return { uid: getDoc.data().uid, data: history[latest], id: projectID, name: getDoc.data().name, historylist: Object.keys(history), version: latest, isPublic: (getDoc.data().isPublic || false)};
  }
  catch(err) {
    logger.error(err);
  }
};
module.exports = loadProject;
