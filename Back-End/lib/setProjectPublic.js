const firestore = require("../firebase");
const logger = require("./helpers").logger;
/**---------createProgram--------------
 * adds the program provided in the body
 */

/**--------Parameters (inside of body)------------
 * uid: string representing which user we should be updating
 * name: name of the new document
 * thumbnail: index of the thumbnail picture
 * language: language the program will use
 */
const setProjectPublic = async function(projectID, isPublic = false) {
  if (!projectID) {
    logger.error("No projectID provided for setProjecctPublic function, Exiting");
    return { status:"failure", msg: "Please provide Project ID!"};
  }
  try {
    const projectRef = firestore.collection("/projects").doc(projectID);
    await projectRef.update({ isPublic: isPublic});
    const projectData = await projectRef.get();
    const userRef = firestore.collection("users").doc(projectData.data().uid);
    const userData = await userRef.get();
    let userproject = userData.data().projects;
    const objIndex = userproject.findIndex(obj => obj.id === projectID);
    userproject[objIndex].isPublic = isPublic;
    await userRef.update({
      projects: userproject
    });
    return { status: "success"};
  }
  catch(error) {
    logger.error(error);
    return { status:"failure", msg: "Couldn't update Database!"};
  }
};

module.exports = setProjectPublic;
