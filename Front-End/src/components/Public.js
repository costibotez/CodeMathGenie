import React from "react";
import constants from "../constants";
import Loading from "../components/common/LoadingPage";
import Error from "./Error";
import "styles/Public.scss";
/**--------Props--------
 * None
 */

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used for the refresh button
    };
    this.props.loadProject(this.props.userName, this.props.pID, false);
  }
  render() {
    var codeURL = "";
    if (this.props.error) {
      return <Error errorMsg="Invalid URL" />;
    }
    if (this.props.projectName && this.props.uid && this.props.files) {
      codeURL =
        constants.SERVER_URL +
        "/static/" +
        this.props.uid +
        "/" +
        this.props.pID +
        "/" +
        this.props.files[0];
      if (!this.props.public) {
        return (
        <div className="middle-wrapper">
          <h1>This Project is not Published!</h1>
        </div>
        );
      }
    } else {
      return <Loading />;
    }
    return (
      <div className="Public-wrapper">
        <div className="introduce">
          <p>
            Developer UserName: <b>{this.props.userName}</b>
          </p>
          <p>
            Project Name: <b>{this.props.projectName}</b>
          </p>
        </div>
        <iframe
          className="editor-public-iframe"
          src={codeURL}
          title="public-iframe"
          ref="public-iframe"
        />
      </div>
    );
  }
}

export default Public;
