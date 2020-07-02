import React from "react";
import { CODEMIRROR_CONVERSIONS } from "../../../constants";

let CodeMirror = null;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  // import {Controlled as CodeMirror} from 'react-codemirror2'
  CodeMirror = require("react-codemirror2").Controlled;
  require("codemirror/mode/javascript/javascript.js");
  require("codemirror/mode/htmlmixed/htmlmixed.js");
  require("codemirror/mode/css/css.js");
}
/**----------Props--------
 * None
 */

class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      codeMirrorInstance: null,
      currentLine: 0,
    };
  }

  //==============React Lifecycle Functions===================//
  componentDidMount() {
    window.addEventListener("beforeunload", this.onLeave);
    window.addEventListener("close", this.onLeave);
  }

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onLeave);
    window.removeEventListener("close", this.onLeave);
  };

  onLeave = async ev => {
    if (this.props.project.dirty) {
      ev.returnValue = "";
    }
    return ev;
  };

  setCodeMirrorInstance = codeMirrorInstance => {
    this.setState({ codeMirrorInstance });
  };

  updateCode = (editor, data, newCode) => {
    //if the code's not yet dirty, and the old code is different from the new code, make it dirty
    if (!this.props.project.dirty && this.props.project.codes && this.props.project.codes[this.props.project.current] !== newCode) {
      this.props.setCurrentDirty();
    }
    this.props.setCurrentCode(this.props.project.current, newCode);
  };

  setCurrentLine = cm => {
    const { codeMirrorInstance, currentLine } = this.state;
    let { line } = cm.getCursor();
    if (codeMirrorInstance) {
      //removeLineClass removes the back highlight style from the last selected line
      codeMirrorInstance.removeLineClass(currentLine, "wrap", "selected-line");
      //addLineClass adds the style to the newly selected line
      codeMirrorInstance.addLineClass(line, "wrap", "selected-line");
    }
    this.setState({ currentLine: line });
  };

  render() {
    //json required by CodeMirror
    const current = this.props.project.current;
    const options = {
      mode: this.props.project.langs ? CODEMIRROR_CONVERSIONS[this.props.project.langs[current]] : CODEMIRROR_CONVERSIONS["html"],
      theme: "material", //requires lots of CSS tuning to get a theme to work, be wary of changing
      lineNumbers: true, //text editor has line numbers
      lineWrapping: true, //text editor does not overflow in the x direction, uses word wrap (NOTE: it's like MO Word wrapping, so words are not cut in the middle, if a word overlaps, the whole word is brought to the next line)
      indentWithTabs: true
    };

    return (
      <CodeMirror
        editorDidMount={codeMirrorInstance => {
          codeMirrorInstance.refresh();
          this.setCodeMirrorInstance(codeMirrorInstance);
        }}
        value={this.props.project.codes ? this.props.project.codes[current] : ""}
        lineWrapping
        indentWithTabs={true}
        options={options}
        onCursor={cm => {
          this.setCurrentLine(cm);
        }}
        onBeforeChange={this.updateCode}
        onChange={this.updateCode}
      />
    );
  }
}

export default TextEditor;
