const firestore = require("../firebase");
const logger = require("./helpers").logger;
const addScriptExtLinkToHTML = require("../constants/helpers.js").addScriptExtLinkToHTML;
const fs = require("fs");

/**---------createProgram--------------
 * adds the program provided in the body
 */

/**--------Parameters (inside of body)------------
 * uid: string representing which user we should be updating
 * name: name of the new document
 * thumbnail: index of the thumbnail picture
 * language: language the program will use
 */
function padValue(value) {
  return (value < 10) ? "0" + value : value;
}
const saveHistory = async function(uid, projectID, name, files, codes, langs, isPublic = false, server_url) {
  if (!uid) {
    logger.error("No uid provided for saveHistory function, Exiting");
    return { ok: false, error: "No uid provided" };
  }
  try {
    pid = projectID;
    const offset = -5.0; //offset for EST timezone
    const clientDate = new Date();
    const utc = clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000);
    let current_datetime = new Date(utc + (3600000*offset));
    let time_now = padValue(current_datetime.getHours()) + ":" + padValue(current_datetime.getMinutes()) + (current_datetime.getHours() > 12 ? " (PM) " : " (AM) ") + padValue(current_datetime.getDate()) + "/" + padValue(current_datetime.getMonth() + 1) + "/" + padValue(current_datetime.getFullYear());
    let history = {};
    history[time_now] = { files: files, codes: codes, langs: langs};
    let usersRef = firestore.collection("/users").doc(uid);
    let usersDoc = await usersRef.get();
    var projects = (usersDoc.data().projects ? usersDoc.data().projects : []);
    const user_role = (usersDoc.data().role ? usersDoc.data().role : 'user');
    let project_langs = {};
    langs.forEach(lang => {
      project_langs[lang] = 1;
    });
    if (!projectID) {
      // create new project with data
      const projectData = {
        uid: uid,
        latest: time_now,
        name: name,
        created_at: current_datetime.toUTCString(),
        updated_at: current_datetime.toUTCString(),
        histories: history
      };
      const newProjectDoc = await firestore.collection("/projects").add(projectData);
      pid = newProjectDoc.id;
      
      projects.unshift({
        id: pid,
        name: name,
        created_at: current_datetime.toUTCString(),
        updated_at: current_datetime.toUTCString(),
        langs_used: Object.keys(project_langs),
        isPublic: isPublic
      });
    } else {
      // update existing project with data
      let getDoc = await firestore.collection("/projects").doc(projectID).get();
      var temp_history = (getDoc.data().histories ? getDoc.data().histories : {});
      var original_created_at = getDoc.data().created_at;
      const merged_history = Object.assign(history, temp_history);
      await firestore.collection("/projects").doc(projectID)
        .update({
          name: name,
          created_at: original_created_at,
          updated_at: current_datetime.toUTCString(),
          latest: time_now,
          histories: merged_history
        });
      projects.forEach((element, index, arr) => {
        if ( element.id == pid) {
          arr.splice(index, 1);
        }
      });
      projects.unshift({
        id: pid,
        name: name,
        created_at: original_created_at,
        updated_at: current_datetime.toUTCString(),
        langs_used: Object.keys(project_langs),
        isPublic: isPublic
      });
    }
    // users collection
    usersRef.update({
      projects: projects,
      role: user_role
    });
    const dir1 = '../Projects';
    if (!fs.existsSync(dir1)) {
      await fs.mkdirSync(dir1,(err) => { error_handler(err,'Project folder is created successfully') });
    }
    const dir2 = dir1 + '/' + uid;
    if (!fs.existsSync(dir2)) {
      await fs.mkdirSync(dir2, (err) => { error_handler(err,'User folder is created successfully')} );
    }

    const project_dir = '../Projects/' + uid + '/' + pid;
    if (!fs.existsSync(project_dir)) {
      await fs.mkdirSync(project_dir, (err) => { error_handler(err,'Project folder is created successfully')});
    } else {
      await fs.readdirSync(project_dir).forEach(function(file,index){
        var curPath = project_dir + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
    var temp_codes = addScriptExtLinkToHTML(codes, langs, server_url);
    files.forEach(async (file, index) => {
      await fs.writeFile(project_dir + '/' + file, temp_codes[index], (err) => { error_handler(err,file + ' is created successfully')});
    });
    let cur_getDoc = await firestore.collection("/projects").doc(pid).get();
    const cur_history = (cur_getDoc.data().histories ? cur_getDoc.data().histories : {});
    return { uid: uid, projectID: pid, historylist: Object.keys(cur_history), version: time_now };
  }
  catch(err) {
    logger.error(err);
  }
};
const error_handler = (err, msg) => {
  if (err) {
    throw err;
  } else {
    logger.info(msg);
  }  
}
module.exports = saveHistory;
