import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";
import studentDataReducer from "./studentDataReducer";
import usersListReducer from "./usersListReducer";
import projectReducer from "./projectReducer";
import fileeditReducer from "./fileeditReducer";
import userModalReducer from "./userModalReducer";
import uiReducer from "./uiReducer";
import { reducer as toastrReducer } from "react-redux-toastr";
const appReducers = combineReducers({
  userData: userDataReducer,
  studentData: studentDataReducer,
  usersList: usersListReducer,
  project: projectReducer,
  userModal: userModalReducer,
  fileedit: fileeditReducer,
  ui: uiReducer,
  toastr: toastrReducer,
});

export default appReducers;
