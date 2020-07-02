const firestore = require("../firebase");
const logger = require("./helpers").logger;
var admin = require('firebase-admin');
var serviceAccount = require("../firebase/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://icodegenie.firebaseio.com"
});
/**
 * getUser
 *
 *  @param {json} uid - firebase user id key for database
 *  @returns {json}
 */
const setCertainUserData = async function(userData) {
  if (userData.id) {
    // Existing User
    try {
        let userRef = firestore
                .collection("/users")
                .doc(userData.id);
        let userDoc = await userRef.get();
        const oldData = userDoc.data();
        const  dataToSet = {
            name: (userData.name ? userData.name : oldData.name ),
            email: (userData.email ? userData.email : oldData.email),
            username: (userData.username ? userData.username : (oldData.username || "")),
            role: (userData.role ? userData.role : oldData.role),
            active: ((userData.active === true || userData.active === false) ? userData.active : (oldData.active || false)),
            location: (userData.location ? userData.location : oldData.location),
        };
        userRef
            .set(dataToSet, {merge: true});
        return { userData: { id: userData.id, ...dataToSet}};
    }
    catch(err) {
        logger.error(err);
    }
  } else {
    // New User
    try {
        const dataToSet = {
            name: userData.name,
            email: userData.email,
            username: userData.username,
            role: (userData.role ? userData.role : 'user'),
            active: userData.active,
            location: userData.location,
        };
        return admin.auth().createUser({
            email: userData.email,
            emailVerified: false,
            displayName: userData.name,
            disabled: false
            })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("######## Email Don't Exists ##########");
            firestore
                .collection("/users")
                .doc(userRecord.uid)
                .set(dataToSet);
            return { userData: { id: userRecord.uid, ...dataToSet}};
        })
        .catch(function(error) {
            if (error.code === 'auth/email-already-exists') {
                return admin.auth().getUserByEmail(userData.email)
                .then(async function(userRecord) {
                    // Google Account exist with email
                    console.log("### Email Exists");
                    firestore
                        .collection("/users")
                        .doc(userRecord.uid)
                        .set( dataToSet, {merge: true});
                    return { userData: { id: userRecord.uid, ...dataToSet}};
                })
                .catch(async function(error) {
                    console.log(error);
                    logger.error(error);
                    return { userData: {}};
                });
            }
            console.log(error);
            return { userData: {}};
        });
    }
    catch(err) {
        logger.error(err);
    }
  }
};
  
  module.exports = {
    setCertainUserData,
  };
  