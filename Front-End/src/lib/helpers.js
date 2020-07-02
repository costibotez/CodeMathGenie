import { JAVASCRIPT, CSS, HTML } from "./index.js";
export const languageToDisplay = lang => {
  switch (lang) {
    case CSS:
      return "CSS";
    case JAVASCRIPT:
      return "JavaScript";
    case HTML:
      return "HTML";
    default:
      return "";
  }
};

