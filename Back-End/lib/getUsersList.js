const firestore = require("../firebase");
const logger = require("./helpers").logger;
/**
 * getUser
 *
 *  @param {json} 
 *  @returns {json}
 */
const getUsersList = async function() {
    try {
        const snapshot = await firestore.collection('users').get();
        const documents = [];
        snapshot.forEach(doc => {
        documents.push({ id: doc.id, ...doc.data()});
        });
        return { usersList: documents };
    }
    catch(err) {
        logger.error(err);
    }
};

module.exports = getUsersList;
