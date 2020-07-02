const defaultTemplate = require("../constants/helpers.js").defaultTemplate;
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

const createProject = async function(uid, server_url) {
  if (!uid) {
    logger.error("No uid provided for createProject function, Exiting");
    return { ok: false, error: "No uid provided" };
  }
  try {
    const projects_dir = '../Projects';
    if (!fs.existsSync(projects_dir)) {
      await fs.mkdirSync(projects_dir,(err) => { error_handler(err,'Project folder is created successfully') });
    }
    const user_dir = projects_dir + '/' + uid;
    if (!fs.existsSync(user_dir)) {
      await fs.mkdirSync(user_dir, (err) => { error_handler(err,'User folder is created successfully')} );
    }
    const temp_dir = user_dir + '/Temp';
    if (!fs.existsSync(temp_dir)) {
      await fs.mkdirSync(temp_dir, (err) => { error_handler(err,'Temp folder is created successfully')});
    } else {
      await fs.readdirSync(temp_dir).forEach(function(file,index){
        var curPath = temp_dir + "/" + file;
        if(fs.lstatSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else { // delete file
          fs.unlinkSync(curPath);
        }
      });
    }
    var file_names = [];
    var file_codes = [];
    var file_langs = [];
    defaultTemplate.forEach(async (template) => {
      var tempcode_file = template.name + '.' + template.lang;
      file_names.push(tempcode_file);
      file_codes.push(template.code);
      file_langs.push(template.lang);
    });
    var temp_codes = addScriptExtLinkToHTML(file_codes, file_langs, server_url);
    file_names.forEach(async (file_name, index) => {
      await fs.writeFile(temp_dir + '/' + file_name, temp_codes[index], (err) => { error_handler(err,file_name + ' is created successfully')});
    });
    return { dir: '/' + uid + '/Temp', files: file_names, codes: file_codes, langs: file_langs, uid: uid };
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
module.exports = createProject;
