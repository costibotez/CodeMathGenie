import HistoryPanel from "../HistoryPanel";
import { connect } from "react-redux";
import { loadCertainVersion } from "../../../actions/projectActions";
const mapStateToProps = (state, ownProps) => {
  var temp_history = state.project.history;
  // if (temp_history) {
  //   temp_history.sort((a,b) => {
  //     var x = parseInt(a.replace(/_/g,''));
  //     var y = parseInt(b.replace(/_/g,''));
  //     return y-x;
  //   });
  // }
  return {
    uid: state.userData.uid,
    id: state.project.id,
    history: temp_history,
    version: state.project.version,
    panelOpen: state.ui.panelOpen
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCertainVersion: (uid, pid, version, isTempUpgrade) => dispatch(loadCertainVersion(uid, pid, version, isTempUpgrade)),
  };
};

const HistoryPanelContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HistoryPanel);

export default HistoryPanelContainer;
