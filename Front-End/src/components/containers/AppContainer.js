/*
	used to link state to App which contains the router, could link functions, but rather do that in each individual container
*/
import App from "../app.js";
import { connect } from "react-redux";
import { setUserData, userDataFailure, clearUserData } from "../../actions/userDataActions.js";
import { addConsole } from "../../actions/projectActions";
import { screenResize } from "../../actions/uiActions";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
    role: state.userData.role,
    isDisabledUser:
      state.userData.status &&
      (state.userData.status === "disabled" || state.userData.status === "new"),
    errorMsg: state.userData.error,
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserData: (uid, name, email, phoneNumber, photoURL) =>
      dispatch(setUserData(uid, name, email, phoneNumber, photoURL)),
    userDataFailure: error => dispatch(userDataFailure(error)),
    screenResize: (width, height) => dispatch(screenResize(width, height)),
    addConsole: msg => dispatch(addConsole(msg)),
    clearUserData: () => {
      dispatch(clearUserData());
    },
  };
};

const Root = connect(mapStateToProps, mapDispatchToProps)(App);

export default Root;
