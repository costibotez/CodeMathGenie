const logger = require("../lib/helpers").logger;
const JAVASCRIPT = "js";
const CSS = "css";
const HTML = "html";

// const LANGUAGES = [PYTHON, JAVASCRIPT, JAVA, CPP, PROCESSING, HTML];
const LANGUAGES = [HTML, JAVASCRIPT, CSS];

//converts default languages to the default code provided with them
if (!String.prototype.splice) {
  /**
   * {JSDoc}
   *
   * The splice() method changes the content of a string by removing a range of
   * characters and/or adding new characters.
   *
   * @this {String}
   * @param {number} start Index at which to start changing the string.
   * @param {number} delCount An integer indicating the number of old chars to remove.
   * @param {string} newSubStr The String that is spliced in.
   * @return {string} A new string with the spliced substring.
   */
  String.prototype.splice = function(start, delCount, newSubStr) {
      return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
  };
}
function AddExternalLinktoStr(str) {
  const strForExtLink = " target='_blank'";
  var startIndex = 0, index;
  while ((index = str.indexOf('<a', startIndex)) > -1) {
    startIndex = str.indexOf('>',index);
    str = str.splice(startIndex, 0, strForExtLink);
    startIndex += strForExtLink.length;
  }
  return str;
}
const languageToDefaultCode = lang => {
  switch (lang) {
    case CSS:
      return "h1 {\n color: red;\n }";
    case JAVASCRIPT:
      return 'console.log("Hello World!")';
    // case HTML:
    //   return "<html>\n  <head>\n    <title>Hello World!</title>\n    <script src='script.js'></script>\n    <link rel='stylesheet' type='text/css'  href='style.css'/>\n  </head>\n  <body>\n    <h1>My Website</h1>\n    <p>This is demo</p>\n  </body>\n</html>";
    case HTML:
        return "<html>\n  <head>\n    <title>Hello World!</title>\n  </head>\n  <body>\n    <h1>My Website</h1>\n    <p>This is demo</p>\n  </body>\n</html>";
    default:
      logger.error(
        "languageToDefaultCode exception: program language received that's not accounted for: " +
          lang,
      );
      return "";
  }
};
const defaultTemplate = [
  { name: 'index', lang: HTML, code: languageToDefaultCode(HTML) },
  // { name: 'script', lang: JAVASCRIPT, code: languageToDefaultCode(JAVASCRIPT) },
  // { name: 'style', lang: CSS, code: languageToDefaultCode(CSS) }
];

const iframeCommunicationScript = server_url => ("<script src='//" + server_url + "/script/iframecommunication.js'></script>")
const addScriptExtLinkToHTML = (codes, langs, server_url) => {
  var newcodes = {...codes};
  const script = iframeCommunicationScript(server_url);
  langs.forEach((lang, index) => {
    if(lang == "html") {
      var insert_index = newcodes[index].indexOf('<head>');
      if (insert_index === -1) {
        insert_index = 0;
      } else {
        insert_index += 6;
      }
      newcodes[index] = newcodes[index].splice(insert_index, 0, script);
      newcodes[index] = AddExternalLinktoStr(newcodes[index]);
    }
  });
  return newcodes;
}
const removeScriptExtLinkToHTML = (codes, server_url) => {
  var newcodes = {...codes};
  const script = iframeCommunicationScript(server_url);
  codes.forEach(code => {
    code.replace(script,'');
    code.replace(" target='_blank'",'');
  });
  return newcodes;
}
module.exports = {
  //language
  LANGUAGES,
  //helper functions
  languageToDefaultCode,
  defaultTemplate,
  addScriptExtLinkToHTML,
  removeScriptExtLinkToHTML
};
