import Main from "../Main.js";
import { connect } from "react-redux";
import { togglePanel } from "../../actions/uiActions.js";
import { clearUserData, userDataFailure } from "../../actions/userDataActions";
import { getUsersList} from "../../actions/usersListActions";
import { CLOSED_PANEL_LEFT, OPEN_PANEL_LEFT } from "../../constants";

const mapStateToProps = state => {
  return {
    uid: state.userData.uid,
    name: state.userData.name,
    username: state.userData.username,
    email: state.userData.email,
    role: state.userData.role,
    location: state.userData.location,
    photoURL: state.userData.photoURL,
    recentProjects: state.userData.projects ? state.userData.projects.slice(0, 3) : [],
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    panelOpen: state.ui.panelOpen,
    users: state.usersList.users,
    panelLeft: state.ui.panelOpen ? OPEN_PANEL_LEFT : CLOSED_PANEL_LEFT,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsersList: () => dispatch(getUsersList()),
    togglePanel: () => dispatch(togglePanel()),
    clearUserData: () => dispatch(clearUserData()),
    userDataFailure: error => dispatch(userDataFailure(error)),
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
