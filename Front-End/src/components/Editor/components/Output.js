import React from "react";
import constants from "../../../constants";
/**--------Props--------
 * None
 */

class Output extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //used for the refresh button
      counter: 0,
      showConsole: true,
    };
    this.firstLoad = true;
  }

  //==============React Lifecycle Functions===================//
  shouldComponentUpdate = (nextProps, nextState) => {
    if (this.state.showConsole !== nextState.showConsole) {
      return true;
    }

    if (this.props.mostRecentProgram !== nextProps.mostRecentProgram) {
      this.firstLoad = true;
      return true;
    }
    if (nextProps.isDragging !== this.props.isDragging) {
      return true;
    }
    if (this.props.isSmall !== nextProps.isSmall) {
      return true;
    }

    if (
      this.props.project.run !== nextProps.project.run ||
      this.state.counter !== nextState.counter ||
      this.state.showConsole !== nextState.showConsole
    ) {
      this.firstLoad = false;
      return true;
    }
    return false;
  };

  // a bit hacky, but we're re-rendering the output
  // by updating the state in a novel way
  reRenderOutput = () => {
    this.setState(prevState => ({
      counter: prevState.counter + 1,
    }));
  };

  renderOutput = () => {
    //check if getsrcdoc is a function
    var codeURL = "";
    if (this.props.project && this.props.uid && this.props.project.files) {
      const file_display =
        this.props.project.langs[this.props.project.current] === "html"
          ? this.props.project.current
          : 0;
      codeURL =
        constants.SERVER_URL +
        "/static/" +
        this.props.uid +
        "/Temp/" +
        this.props.project.files[file_display];
    }

    return (
      <iframe
        id={this.state.counter + " " + this.props.project.run}
        key={this.state.counter + " " + this.props.project.run}
        className={
          "editor-output-iframe " +
          (this.props.isDragging && this.props.isDragging === true
            ? "notInteractive"
            : "isInteractive")
        }
        src={codeURL}
        title="output-iframe"
        ref="output-iframe"
        onLoad={e => {}}
      />
    );
  };

  render() {
    return <div className="editor-output">{this.renderOutput()}</div>;
  }
}

export default Output;
