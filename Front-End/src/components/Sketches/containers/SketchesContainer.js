import Sketches from "../index.js";
import { connect } from "react-redux";
import { getUserData, getUserDataByName } from '../../../actions/userDataActions';
import { getStudentData } from '../../../actions/studentDataActions';

const mapStateToProps = state => {
  return {
    myuid: state.userData.uid,
    myname: state.userData.name,
    myStatus: state.userData.status,
    myProjects: state.userData.projects || [],
    studentStatus: state.studentData.status,
    studentProjects: state.studentData.projects || [],
    studentName: state.studentData.name,
    screenWidth: state.ui.screenWidth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: (uid) => dispatch(getUserData(uid)),
    getUserDataByName: (username) => dispatch(getUserDataByName(username)),
    getStudentData: (uid) => dispatch(getStudentData(uid)),
  };
};

const SketchesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sketches);

export default SketchesContainer;
