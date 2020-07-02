const firestore = require("../firebase");
const logger = require("./helpers").logger;
/**
 * getUser
 *
 *  @param {json} username - firebase user id key for database
 *  @returns {json}
 */
const getUserDataByName = async function(username) {
  if (!username) {
    logger.error("No User Name provided for getUserDataByName function, Exiting");
    return { error: "No User Name provided" };
  }
  try {
    let userDoc = await firestore
        .collection("/users")
        .where('username','==',username.toString())
        .get();
    if (userDoc.empty) {
      logger.error("No User with that ID executing getUserDataByName, Exiting");
      return { error: "No User with that ID" };
    }
    let userdata = null;
    userDoc.forEach(doc => {
      userdata = { uid: doc.id, ...doc.data()};
    })
    return { status: "success", userData: userdata };
  }
  catch(err) {
    logger.error(err);
  }
};

module.exports = getUserDataByName;
