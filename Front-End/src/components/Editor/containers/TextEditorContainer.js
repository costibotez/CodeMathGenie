import TextEditor from "../components/TextEditor";
import { connect } from "react-redux";
import { setCurrentCode, setCurrentDirty } from "../../../actions/projectActions.js";

const mapStateToProps = state => {

  //program data should be an object representing the most recent program
  //should have 2 keys, code (which is the code) and langauge (which is the language the code is written it)
  // add key dirty
  return {
    project: state.project
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentCode: (index, code) => {
      dispatch(setCurrentCode(index, code));
    },
    setCurrentDirty: () => {
      dispatch(setCurrentDirty(true));
    },
  };
};

const TextEditorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TextEditor);

export default TextEditorContainer;
