import Public from "../Public.js";
import { connect } from "react-redux";
import { loadProject } from "../../actions/projectActions";

const mapStateToProps = state => {
  return {
    uid: state.project.uid,
    public: state.project.isPublic || false,
    projectName: state.project.name,
    files: state.project.files,
    error: state.project.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadProject: (uid,pid, isTempUpgrade) => {
      dispatch(loadProject(uid, pid, isTempUpgrade));
    },
  };
};

const PublicContainer = connect(mapStateToProps, mapDispatchToProps)(Public);

export default PublicContainer;
