import React from "react";
import "styles/Panel.scss";

/**--------Props--------
 * togglePanel: function to be called when the panel is collapsed or opened
 */

class HistoryPanel extends React.Component {
  onShowVersion = version => {
    if ( version !== this.props.version) {
      this.props.loadCertainVersion(this.props.uid, this.props.id, version, true);
    }
  }
  renderContent = () => (
      <ul>
        {
          this.props.history ? this.props.history.map((historyitem, index) => 
            <li key={index}>
              <button onClick={() => { this.onShowVersion(historyitem)} } className={"history-link " + (historyitem === this.props.version ? "active":"")}>{historyitem}</button>
            </li>
          ) : ""
        }
      </ul>
  );


  render() {
    const panelStyle = {
      width: (this.props.panelOpen ? '20%' : '0'),
    };
    return (
      <div className="panel" style={panelStyle}>
        {this.renderContent()}
      </div>
    );
  }
}

export default HistoryPanel;
