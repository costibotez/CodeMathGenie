//TODO: Break up large constants file into smaller constants file

const JAVASCRIPT = "js";
const HTML = "html";
const CSS = "css";

const SUPPORTED_LANGUAGES = [HTML, JAVASCRIPT, CSS];
const LOCATIONS = ["EB", "MB", "NB", "PB", "SPL"];
const LOCATIONS_OPTIONS = [
  { value: 'EB', label: 'EB' },
  { value: 'MB', label: 'MB' },
  { value: 'NB', label: 'NB' },
  { value: 'PB', label: 'PB' },
  { value: 'SPL', label: 'SPL' },
];
//used for syntax highlighting in editor
let CODEMIRROR_CONVERSIONS = {};
let LANGUAGE_NAME_CONVERSIONS = {};
//for each s
SUPPORTED_LANGUAGES.forEach(lang => {
  switch (lang) {
    case JAVASCRIPT:
      CODEMIRROR_CONVERSIONS[lang] = "javascript";
      LANGUAGE_NAME_CONVERSIONS[lang] = "JavaScript";
      return;
    case HTML:
      CODEMIRROR_CONVERSIONS[lang] = "htmlmixed";
      LANGUAGE_NAME_CONVERSIONS[lang] = "HTML";
      return;
    case CSS:
      CODEMIRROR_CONVERSIONS[lang] = "css";
      LANGUAGE_NAME_CONVERSIONS[lang] = "CSS";
      return;
    default:
      console.error("SUPPORTED LANGUAGE WITH NO MODE");
  }
});

const PUBLIC_URL = process.env.PUBLIC_URL;
const PHOTO_NAMES = {
  lightbulb: `${PUBLIC_URL}/img/icons/lightbulb.png`,
  orange: `${PUBLIC_URL}/img/icons/orange.png`,
  pear: `${PUBLIC_URL}/img/icons/pear.png`,
  apple: `${PUBLIC_URL}/img/icons/apple.png`,
  hotdog: `${PUBLIC_URL}/img/icons/hotdog.png`,
  icecream: `${PUBLIC_URL}/img/icons/icecream.png`,
  cloud: `${PUBLIC_URL}/img/icons/cloud.png`,
  earth: `${PUBLIC_URL}/img/icons/earth.png`,
  heart: `${PUBLIC_URL}/img/icons/heart.png`,
};

// GH Repo for FE

const GH_REPO_NAME = "https://github.com/uclaacm/TeachLAFrontend";

// Router's base (i.e. anything after the domain)

const ROUTER_BASE_NAME = "/";

// Various Server URLs
var SERVER_URL = "http://localhost:8081";
if (process && process.env) {
  if (process.env.REACT_APP_SERVER_TYPE === "staging") {
    SERVER_URL = "https://code.mathgenie.com/api";
  }
  if (process.env.REACT_APP_SERVER_TYPE === "prod") {
    SERVER_URL = "https://code.mathgenie.com/api";
  }
}

const PANEL_SIZE = 250;

module.exports = {
  //Language definitions
  JAVASCRIPT,
  HTML,
  CSS,
  LOCATIONS,
  LOCATIONS_OPTIONS,
  // photo names
  PHOTO_NAMES,
  DEFAULT_PHOTO_NAME: "icecream",

  GH_REPO_NAME,

  // Router Base Name
  ROUTER_BASE_NAME,

  //Server Host Name
  SERVER_URL,

  //User value constants
  MINIMUM_USERNAME_LENGTH: 6,
  MINIMUM_PASSWORD_LENGTH: 6,
  MINIMUM_DISPLAY_NAME_LENGTH: 1,
  MAXIMUM_USERNAME_LENGTH: 20,
  MAXIMUM_PASSWORD_LENGTH: 20,
  MAXIMUM_DISPLAY_NAME_LENGTH: 25,

  //Defaults
  DEFAULT_MODE: HTML,
  DEFAULT_LANG: HTML,

  // UI constants
  RING_LOADER_SIZE: 50,
  PANEL_SIZE,
  CLOSED_PANEL_LEFT: -1 * PANEL_SIZE,
  OPEN_PANEL_LEFT: 0,

  //codemirror conversions
  CODEMIRROR_CONVERSIONS,
  LANGUAGE_NAME_CONVERSIONS,
  SUPPORTED_LANGUAGES,
  //Firebase constants
  EMAIL_DOMAIN_NAME: "@fake.com",
};
