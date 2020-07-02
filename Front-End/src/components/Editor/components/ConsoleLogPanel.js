import React from "react";
import '../../../styles/ConsoleLogPanel.scss';
import { faAngleDoubleUp, faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/**--------Props---------------
 * files: array of files in current project
 */

export default class ConsoleLogPanel extends React.Component {
  
  toggleConsole = () => {
    this.props.toggleConsolePanel();
  }
  render() {
    return (
      <div className="console-panel">
         <div className="console-tool">
           <button className="btn-toggle-console" onClick={this.toggleConsole}>
            {
              this.props.consolePanelOpen ? <FontAwesomeIcon icon={faAngleDoubleDown}/> : <FontAwesomeIcon icon={faAngleDoubleUp} />
            }
           </button>
         </div>
         <div className="log-panel">
          <ul>
            {
              this.props.consolelogs ? this.props.consolelogs.map((consolelog, index) => 
                  <li key={index}> 
                    <span className={"log-icon " + consolelog.type}>{consolelog.type}</span> 
                    <span className="log-data">{consolelog.data} </span>
                  </li>
              ) : ""
            }
            </ul>
          </div>
      </div>
    );
  }
}
