import Editor from "../index.js";
import { connect } from "react-redux";
import { togglePanel, toggleConsolePanel, setSplitDragging } from "../../../actions/uiActions.js";
import {
  showfile,
  renameProject,
  createProject,
  setCurrentDirty,
  saveProject,
  runProject,
  addNewFile,
  renameFile,
  deleteFile,
  clearConsole,
  loadProject,
  setProjectPublic
} from "../../../actions/projectActions";
import {
  openNewModal,
  openUpdateModal,
  closeModal,
  selectLanguageOfNew,
} from "../../../actions/fileeditActions";
import { getUserData } from "../../../actions/userDataActions";
const mapStateToProps = state => {
  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)

  return {
    uid: state.userData.uid,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    consolePanelOpen: state.ui.consolePanelOpen,
    project: state.project,
    fileedit: state.fileedit,
    userData: state.userData,
    studentData: state.studentData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: uid => dispatch(getUserData(uid)),
    runProject: () => dispatch(runProject()),
    setCurrentDirty: isDirty => dispatch(setCurrentDirty(isDirty)),
    togglePanel: () => dispatch(togglePanel()),
    showfile: index => dispatch(showfile(index)),
    renameProject: value => dispatch(renameProject(value)),
    createProject: uid => dispatch(createProject(uid)),
    loadProject: (uid,pid, isTempUpgrade) => dispatch(loadProject(uid,pid, isTempUpgrade)),
    saveProject: (uid,uid_editor, pid, name, files, codes, langs, isPublic) =>
      dispatch(saveProject(uid,uid_editor, pid, name, files, codes, langs, isPublic)),
    addNewFile: (lang, name) => dispatch(addNewFile(lang, name)),
    renameFile: (index, lang, name) => dispatch(renameFile(index, lang, name)),
    deleteFile: index => dispatch(deleteFile(index)),
    openNewModal: () => dispatch(openNewModal()),
    openUpdateModal: (index, lang, name) => dispatch(openUpdateModal(index, lang, name)),
    closeModal: () => dispatch(closeModal()),
    selectLanguageOfNew: lang => dispatch(selectLanguageOfNew(lang)),
    clearConsole: () => dispatch(clearConsole()),
    toggleConsolePanel: () => dispatch(toggleConsolePanel()),
    setSplitDragging: isDragging => dispatch(setSplitDragging(isDragging)),
    setProjectPublic: (pid, isPublic) => dispatch(setProjectPublic(pid, isPublic))
  };
};

const EditorContainer = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default EditorContainer;
