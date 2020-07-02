const firestore = require("../firebase");
const logger = require("./helpers").logger;
/**
 * getUser
 *
 *  @param {json} uid - firebase user id key for database
 *  @returns {json}
 */
const setUserData = async function(uid, name, email, phoneNumber, photoURL) {
  try {
    let userRef = firestore
        .collection("/users")
        .doc(uid.toString());
    let userDoc = await userRef.get();
    if (userDoc.exists) {
      const userData = userDoc.data();
      if (!userData.active) {
        // It's disabled user

        return { status : "disabled", userData: {}};
      } else {
        // It's active user, it'll return all data.
        await userRef.set({
          name : userData.name ? userData.name : name,
          email : userData.email ? userData.email : email,
          phoneNumber : phoneNumber,
          photoURL : photoURL
        }, {merge: true});
        userDoc = await userRef.get();
        return { status: "success", userData: { uid: uid, ...userDoc.data()}};
      }
    } else {
      // It's new User
      return { status : "new", userData: {}};
    }
  }
  catch(err) {
    logger.error(err);
  }
};

module.exports = setUserData;
