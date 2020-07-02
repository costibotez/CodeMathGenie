import { connect } from "react-redux";
import Output from "../components/Output.js";

const mapStateToProps = state => {
  return {
    project: state.project,
    screenHeight: state.ui.screenHeight,
    isDragging: state.ui.isDragging,
    uid: state.userData.uid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearOutput: () => {},
  };
};

const OutputContainer = connect(mapStateToProps, mapDispatchToProps)(Output);

export default OutputContainer;
