const logger = require("./helpers").logger;
const fs = require("fs");
const addScriptExtLinkToHTML = require("../constants/helpers.js").addScriptExtLinkToHTML;

/**---------createProgram--------------
 * adds the program provided in the body
 */

/**--------Parameters (inside of body)------------
 * uid: string representing which user we should be updating
 * name: name of the new document
 * thumbnail: index of the thumbnail picture
 * language: language the program will use
 */

const SaveTempProject = async function(uid, files, codes, langs, server_url) {
  if (!uid) {
    logger.error("No uid provided for SaveTempProject function, Exiting");
    return { ok: false, error: "No uid provided" };
  }
  try {
    const dir1 = '../Projects';
    if (!fs.existsSync(dir1)) {
      await fs.mkdirSync(dir1,(err) => { error_handler(err,'Project folder is created successfully') });
    }
    const dir2 = dir1 + '/' + uid;
    if (!fs.existsSync(dir2)) {
      await fs.mkdirSync(dir2, (err) => { error_handler(err,'User folder is created successfully')} );
    }
    const temp_dir = '../Projects/' + uid + '/Temp';
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
    var temp_codes = addScriptExtLinkToHTML(codes, langs, server_url);
    files.forEach(async (file, index) => {
      await fs.writeFile(temp_dir + '/' + file, temp_codes[index], (err) => { error_handler(err,file + ' is created successfully')});
    });
    return { status: "success"};
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
module.exports = SaveTempProject;
