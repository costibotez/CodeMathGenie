import { projectConstants } from "../constants/project.constants";
import { getUserData } from "./userDataActions";
import { toastr } from "react-redux-toastr";
import * as fetch from "../lib/fetch.js";

export function createProject(uid) {
  return dispatch => {
    dispatch(projectRequest("createProject"));
    fetch
      .createProject(uid)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(uid, data.dir, data.files, data.codes, data.langs));
      })
      .catch(err => {
        console.log(err);
        dispatch(projectFailure("createProject",err));
      });
  };
  function success(uid, directory, files, codes, langs) {
    return {
      type: projectConstants.CREATE_SUCCESS,
      uid: uid,
      directory: directory,
      files: files,
      codes: codes,
      langs: langs,
    };
  }
}
export function saveProject(uid_owner,uid_editor, pid, name, files, codes, langs, isPublic) {
  return async dispatch => {
    dispatch(projectRequest("saveProject"));
    await fetch.saveTempProject(uid_owner, files, codes, langs);
    fetch
      .saveHistory(uid_owner, pid, name, files, codes, langs, isPublic)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(uid_owner, data.projectID, data.historylist, data.version, isPublic));
        toastr.success("SUCCESS", "Project saved successfully");
        dispatch(getUserData(uid_editor));
      })
      .catch(err => {
        console.log(err);
        dispatch(projectFailure("saveProject",err));
        toastr.error("ERROR", "Could not save the project");
      });
  };
  function success(uid, pid, historylist, version, isPublic) {
    return {
      type: projectConstants.SAVE_SUCCESS,
      uid: uid,
      pid: pid,
      historylist: historylist,
      version: version,
      isPublic: isPublic
    };
  }
}
export function loadCertainVersion(uid, pid, version, isTempUpgrade) {
  return async dispatch => {
    dispatch(projectRequest("loadCertainVersion"));
    fetch
      .getHistoryData(pid, version)
      .then(response => {
        return response.json();
      })
      .then(async data => {
        dispatch(success(data.uid, data.historydata, data.id, data.name, data.historylist, version));
        if (isTempUpgrade) {
          await fetch.saveTempProject(uid, data.historydata.files, data.historydata.codes, data.historydata.langs);
          dispatch(runProject());
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(projectFailure("loadCertainVersion",err));
      });
  };
  function success(uid, data, id, name, historylist, version) {
    return {
      type: projectConstants.LOADVERSION_SUCCESS,
      uid: uid, 
      data: data,
      id: id,
      name: name,
      historylist: historylist,
      version: version,
    };
  }
}
export function setProjectPublic(pid, isPublic) {
  return dispatch => {
    dispatch(projectRequest("setProjectPublic"));
    fetch
      .setProjectPublic(pid, isPublic)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.status === "failure") {
          dispatch(projectFailure("setProjectPublic",data.msg));
        } else {
          dispatch(success(isPublic));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(projectFailure("setProjectPublic",err));
      });
  };
  function success(isPublic) {
    return {
      type: projectConstants.PUBLIC_SUCCESS,
      isPublic: isPublic
    };
  }
}
export function loadProject(uid, pid, isTempUpgrade) {
  return async dispatch => {
    dispatch(projectRequest("loadProject"));
    fetch
      .loadProject(pid)
      .then(response => {
        return response.json();
      })
      .then(async data => {
        if (data.ok === false) {
          dispatch(projectFailure("loadProject",data.error));
        } else {
          dispatch(success(data.uid, data.data, data.id, data.name, data.historylist, data.version, data.isPublic));
          if (isTempUpgrade) {
            await fetch.saveTempProject(uid, data.data.files, data.data.codes, data.data.langs);
            dispatch(runProject());
          }
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(projectFailure("loadProject",err));
      });
  };
  function success(uid, data, id, name, historylist, version, isPublic) {
    return {
      type: projectConstants.LOADPROJECT_SUCCESS,
      uid: uid, 
      data: data,
      id: id,
      name: name,
      historylist: historylist,
      version: version,
      isPublic: isPublic
    };
  }
}
function projectRequest(msg) {
  return { type: projectConstants.PROJECT_REQUEST, msg: msg };
}
function projectFailure(msg, error) {
  return { type: projectConstants.PROJECT_FAILURE, msg: msg, error: error };
}
export function runProject() {
  return { type: projectConstants.RUN_PROJECT };
}
export function showfile(index) {
  return { type: projectConstants.SHOW_FILE, index: index };
}

export function setCurrentCode(index, code) {
  return { type: projectConstants.SET_CODE, index: index, code: code };
}
export function setCurrentDirty(isDirty) {
  return { type: projectConstants.SET_DIRTY, dirty: isDirty };
}
export function renameProject(name) {
  return { type: projectConstants.RENAME_PROJECT, name: name };
}
export function addNewFile(lang, name) {
  return { type: projectConstants.NEW_FILE_PROJECT, lang: lang, name: name };
}
export function addConsole(msg) {
  return { type: projectConstants.ADD_TO_CONSOLE, consolelogs: msg };
}
export function clearConsole() {
  return { type: projectConstants.CLEAR_CONSOLE };
}
export function deleteFile(index) {
  return { type: projectConstants.DELETE_FILE, index: index };
}
export function renameFile(index, newLang, newName) {
  return { type: projectConstants.RENAME_FILE, index: index, newLang: newLang, newName: newName };
}
