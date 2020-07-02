import React from "react";
import SplitPane from "react-split-pane";
import { Button } from "reactstrap";
import ViewportAwareButton from "./components/ViewportAwareButton.js";
import OutputContainer from "./containers/OutputContainer.js";
import TextEditorContainer from "./containers/TextEditorContainer";
// import OpenPanelButtonContainer from "../common/containers/OpenPanelButtonContainer";
import EditorRadio from "./components/EditorRadio.js";
import FileView from "./components/FileView.js";
import { Grid, Row, Col } from "react-flexbox-grid";
import { FileModal } from "./components/FileModal";
import ConsoleLogPanel from "./components/ConsoleLogPanel";
import Loading from "components/common/LoadingPage.js";
import { withRouter } from 'react-router-dom';

import * as fetch from "../../lib/fetch.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faBars, faPlay } from "@fortawesome/free-solid-svg-icons";
import { EDITOR_WIDTH_BREAKPOINT, CODE_AND_OUTPUT, CODE_ONLY, OUTPUT_ONLY } from "./constants";
import { PANEL_SIZE } from "../../constants";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "styles/CustomCM.scss";
import "styles/Resizer.scss";
import "styles/Editor.scss";

/**------Props-------
 * togglePanel: function to call when you want the Profile Panel to disappear/reapper
 * panelOpen: boolean telling whether the Profile Panel is open or not
 * left: the left css property that should be applied on the top level element
 */

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saveText: "Save",
      viewMode: this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT ? CODE_ONLY : CODE_AND_OUTPUT,
      pane1Style: { transition: "width .5s ease" },
      isPublic: false,
      isfirst: true
    };
    this.renameProject = this.renameProject.bind(this);
    this.handleBack = this.handleBack.bind(this)

    //Project load
    if (!this.props.projectID) {
      // Create New Project
      this.props.createProject(this.props.uid);
    } else {
      // Load existing Project
      this.props.loadProject(this.props.uid, this.props.projectID, true);
    }
  }
  //==============React Lifecycle Functions Start===================//
  componentDidUpdate(prevProps) {
    if (this.props.screenWidth !== prevProps.screenWidth) {
      if (this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT) {
        if (this.state.viewMode === CODE_AND_OUTPUT) {
          this.setState({ viewMode: CODE_ONLY });
        }
      }
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (this.props.projectID && !nextProps.projectID) {
      this.props.createProject(this.props.uid);
    }
    switch (nextProps.project.status) {
      case "saveProject":
        if(!nextProps.project.error) {
          this.setSaveText("Saving...");
        } else {
          this.setSaveText("Error!");
          setTimeout(this.setSaveText("Save"), 3000);
        }
        break;
      case "saved":
        this.setSaveText("Saved!");
        setTimeout(this.setSaveText("Save"), 3000);
        break;
      default:
        break;
    }
    if (this.state.isfirst) {
      this.setState({isPublic: nextProps.project.isPublic});
    }
  }
  setSaveText = msg => {
    this.setState({
      saveText: msg,
    });
  };
  runCode = async () => {
    // this.setState(prevState => ({
    //   run: prevState.run + 1,
    // }));
    await fetch.saveTempProject(
      this.props.uid,
      this.props.project.files,
      this.props.project.codes,
      this.props.project.langs,
    );
    this.props.clearConsole();
    this.props.runProject();
  };
  handleSave = event => {
    if (!this.props.project.dirty && this.props.projectID) return; // Don't save if not dirty (unedited)
    this.props.saveProject(
      this.props.project.uid ? this.props.project.uid : this.props.uid,
      this.props.uid,
      this.props.project.id,
      this.props.project.name,
      this.props.project.files,
      this.props.project.codes,
      this.props.project.langs,
      this.props.project.isPublic
    );
  };
  onPublish = () => {
    const isPublic = this.state.isPublic;
    this.setState({isPublic: !isPublic, isfirst: false});
    this.props.setProjectPublic(this.props.project.id, !isPublic);
  };
  // handleDownload = () => {
  //   CodeDownloader.download(this.props.name, this.props.language, this.props.code);
  // };
  // renderDropdown = () => <DropdownButtonContainer />;
  renameProject = e => {
    const { value } = e.target;
    this.props.renameProject(value);
  };
  renderFile = () => (
    <FileView
      files={this.props.project.files}
      langs={this.props.project.langs}
      showfile={this.props.showfile}
      openNewModal={this.props.openNewModal}
      openUpdateModal={this.props.openUpdateModal}
      deleteFile={this.props.deleteFile}
      current={this.props.project.current}
    />
  );
  renderFileAndCode = () => (
    <SplitPane
      resizerStyle={{
        height: "100%",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      pane1Style={this.state.pane1Style}
      //functions called when you start and finish a drag
      //removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => this.setState({ pane1Style: {} })}
      onDragFinished={() => this.setState({ pane1Style: { transition: "width .5s ease" } })}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={90} //minimum size of File is 10% of the remaining screen size
      maxSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.3
      } //max size of File is 50% of the remaining screen size
      size="25%" //the initial size of the text editor section
      allowResize={true}
    >
      {this.renderFile()}
      {this.renderCode()}
    </SplitPane>
  );
  renderCodeAndOutput = () => (
    <SplitPane
      resizerStyle={{
        height: "100%",
        borderLeft: "2px solid #333",
        borderRight: "2px solid #333",
        width: "10px",
      }}
      pane1Style={this.state.pane1Style}
      //functions called when you start and finish a drag
      //removes and re-addsthe transition effect on the first panel when manually resizing
      onDragStarted={() => {
        this.setState({ pane1Style: {} });
        this.props.setSplitDragging(true);
      }}
      onDragFinished={() => {
        this.setState({ pane1Style: { transition: "width .5s ease" } });
        this.props.setSplitDragging(false);
      }}
      split="vertical" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
      minSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.33
      } //minimum size of code is 33% of the remaining screen size
      maxSize={
        (this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) * 0.75
      } //max size of code is 75% of the remaining screen size
      size={
        ((this.props.panelOpen ? this.props.screenWidth - PANEL_SIZE : this.props.screenWidth) /
          5) *
        3
      } //the initial size of the text editor section
      allowResize={true}
    >
      {this.renderFileAndCode()}
      {this.renderOutput()}
    </SplitPane>
  );

  updateViewMode = viewMode => {
    this.setState({ viewMode });
  };
  handleBack = () => {
    this.props.history.goBack()
  }
  renderToolbar = () => {
    const {isPublic} = this.state;
    const isSmall = this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT || this.props.panelOpen;
    return (<Grid fluid>
      <Row className="code-section-banner">
        <Col xs={12} sm={12} md={5} lg={5}>
        <Button className="mx-4 back-button" color="light" size="sm" onClick={this.handleBack}> &#8810; </Button>
          <label>
            Project Name:
            <input
              type="text"
              className="project-name-input"
              name="projectName"
              value={this.props.project.name || ""}
              onChange={this.renameProject}
            />
          </label>
          />
        </Col>
        <Col xs={12} sm={6} md={2} lg={2} className="toolbar-center">
          <EditorRadio
            viewMode={this.state.viewMode}
            updateViewMode={this.updateViewMode}
            isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT}
          />
        </Col>
        <Col xs={12} sm={6} md={5} lg={5}>
          <ViewportAwareButton
            className="mx-2"
            color="success"
            size="lg"
            onClick={this.handleSave}
            isSmall={isSmall}
            icon={
              this.state.saveText === "Saving..." ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <FontAwesomeIcon icon={faSave} />
              )
            }
            text={this.state.saveText}
          />
          <ViewportAwareButton
            className="mx-2"
            color="primary"
            size="lg"
            onClick={this.runCode}
            isSmall={isSmall}
            icon={<FontAwesomeIcon icon={faPlay} />}
            text="Run"
          />
          {this.props.project.history && this.props.project.history.length && (
            <label className={"switch " + (isSmall? "small" :"")}>
              <input type="checkbox" checked={isPublic} onClick={()=> this.onPublish()} readOnly/>
              <span className={"slider round " + (isSmall? "small" :"")}></span>
              { isSmall ? "": isPublic ? 
                <span className="public-text active">Public</span>  :
                <span className="public-text">Private</span>  
              }
              
            </label>
          )}
          <Button className="mx-2" color="light" size="lg" onClick={this.props.togglePanel}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </Col>
      </Row>
    </Grid>
  )};
  renderCode = () => (
    <div className="code-section">
      <div className="text-editor-container">
        <TextEditorContainer key={this.props.mostRecentProgram} />
      </div>
    </div>
  );

  renderOutput = () => {
    return (
      <SplitPane
        resizerStyle={{
          width: "100%",
          borderTop: "2px solid #333",
          borderBottom: "2px solid #333",
          height: "10px",
          cursor: "ns-resize",
        }}
        split="horizontal" //the resizer is a vertical line (horizontal means resizer is a horizontal bar)
        size={this.props.consolePanelOpen ? "70%" : "calc(100% - 25px)"} //the initial size of the text editor section
        allowResize={true}
        onDragStarted={() => this.props.setSplitDragging(true)}
        onDragFinished={() => this.props.setSplitDragging(false)}
      >
        <OutputContainer isSmall={this.props.screenWidth <= EDITOR_WIDTH_BREAKPOINT} />
        <ConsoleLogPanel
          consolelogs={this.props.project.consolelogs}
          consolePanelOpen={this.props.consolePanelOpen}
          toggleConsolePanel={this.props.toggleConsolePanel}
        />
      </SplitPane>
    );
  };

  renderContent = () => {
    switch (this.state.viewMode) {
      case CODE_ONLY:
        return <div>{this.renderFileAndCode()}</div>;
      case OUTPUT_ONLY:
        return <div>{this.renderOutput()}</div>;
      default:
        return this.renderCodeAndOutput();
    }
  };

  render() {
    const style = {
      width: this.props.panelOpen ? "80%" : "100%",
    };
    const iswaiting =
      this.props.project.status === "projectloading" || this.props.project.status === "creating";
    if (iswaiting) {
      return <Loading />;
    }
    return (
      <div className="editor-wrapper" style={style}>
        {this.renderToolbar()}
        <div className="editor">{this.renderContent()}</div>
        <FileModal
          isNew={this.props.fileedit.isNew}
          isOpen={this.props.fileedit.isOpen}
          closeModal={this.props.closeModal}
          addNewFile={this.props.addNewFile}
          renameFile={this.props.renameFile}
          data={this.props.fileedit}
          setCurrentDirty={this.props.setCurrentDirty}
        />
      </div>
    );
  }
}

export default withRouter(Editor);
