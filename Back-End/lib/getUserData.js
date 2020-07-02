const firestore = require("../firebase");
/**
 * getUser
 *
 *  @param {json} uid - firebase user id key for database
 *  @returns {json}
 */
const getUserData = async function(uid) {
  if (!uid) {
    logger.error("No User ID provided for getUserData, Exiting");
    return { error: "No User ID  provided" };
  }
  try {
    let userDoc = await firestore
        .collection("/users")
        .doc(uid.toString())
        .get();
    if (!userDoc.exists) {
      logger.error("No User with that ID executing getUserData, Exiting");
      return { error: "No User with that ID" };
    }
    return { status: "success", userData: { uid: uid, ...userDoc.data()} };
  }
  catch(err) {
    logger.error(err);
  }
};

module.exports = getUserData;
