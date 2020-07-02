import { projectConstants } from "../constants/project.constants";

const initialStatus = {
  name: "",
  status: "init",
  files: null,
  current: 0,
  run: 0,
  consolelogs: [],
  isPublic: false
};

function projectReducer(state = initialStatus, action) {
  switch (action.type) {
    case projectConstants.PROJECT_REQUEST:
      return {
        ...state,
        status: action.msg,
      };
    case projectConstants.PROJECT_FAILURE:
      return {
        ...state,
        status: action.msg,
        error: action.error,
      };
    case projectConstants.CREATE_SUCCESS:
      return {
        status: "created",
        uid: action.uid, 
        files: action.files,
        codes: action.codes,
        langs: action.langs,
        current: 0,
        name: "New Project",
        run: 0,
        history: [],
        dirty: true,
        consolelogs: [],
        isPublic: false
      };
    case projectConstants.SAVE_SUCCESS:
      return {
        ...state,
        status: "saved",
        id: action.pid,
        uid: action.uid, 
        dirty: false,
        history: action.historylist,
        version: action.version,
        isPublic: action.isPublic
      };
    case projectConstants.LOADVERSION_SUCCESS:
      return {
        ...state,
        status: "versionloaded",
        uid: action.uid, 
        files: action.data.files,
        codes: action.data.codes,
        langs: action.data.langs,
        current: 0,
        dirty: false,
        id: action.id,
        name: action.name,
        version: action.version,
        consolelogs: [],
      };
    case projectConstants.PUBLIC_SUCCESS:
      return {
        ...state,
        status: "setPublic",
        isPublic: action.isPublic
      };
    case projectConstants.LOADPROJECT_SUCCESS:
      return {
        status: "projectloaded",
        uid: action.uid, 
        files: action.data.files,
        codes: action.data.codes,
        langs: action.data.langs,
        current: 0,
        run: 0,
        dirty: false,
        consolelogs: [],
        id: action.id,
        name: action.name,
        history: action.historylist,
        version: action.version,
        isPublic: action.isPublic
      };
    case projectConstants.SHOW_FILE:
      return { ...state, current: action.index };
    case projectConstants.SET_CODE:
      const newState = { ...state };
      newState.codes[action.index] = action.code;
      return newState;
    case projectConstants.SET_DIRTY:
      return { ...state, dirty: action.dirty };
    case projectConstants.RUN_PROJECT:
      return { ...state, run: state.run + 1 };
    case projectConstants.RENAME_PROJECT:
      return { ...state, name: action.name, dirty: true };
    case projectConstants.ADD_TO_CONSOLE:
      var temp_logs = state.consolelogs || [];
      temp_logs.push(action.consolelogs);
      return { ...state, consolelogs: temp_logs };
    case projectConstants.CLEAR_CONSOLE:
      return { ...state, consolelogs: [] };
    case projectConstants.NEW_FILE_PROJECT:
      var newlangs = state.langs;
      var newfiles = state.files;
      var newcodes = state.codes;
      newlangs.push(action.lang);
      newfiles.push(action.name + "." + action.lang);
      newcodes.push("");
      return {
        ...state,
        langs: newlangs,
        files: newfiles,
        codes: newcodes,
        current: newlangs.length - 1,
      };
    case projectConstants.RENAME_FILE:
      var files_rename = state.files;
      var langs_rename = state.langs;
      files_rename[action.index] = action.newName + "." + action.newLang;
      langs_rename[action.index] = action.newLang;
      return { ...state, files: files_rename };
    case projectConstants.DELETE_FILE:
      var newlangs_del = state.langs;
      var newfiles_del = state.files;
      var newcodes_del = state.codes;
      newlangs_del.splice(action.index, 1);
      newfiles_del.splice(action.index, 1);
      newcodes_del.splice(action.index, 1);
      return {
        ...state,
        langs: newlangs_del,
        files: newfiles_del,
        codes: newcodes_del,
        current: 0,
      };
    default:
      return state;
  }
}

export default projectReducer;
