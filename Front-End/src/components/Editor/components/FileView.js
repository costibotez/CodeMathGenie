import React from "react";
import "styles/FileView.scss";
import ViewportAwareButton from "./ViewportAwareButton.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactResizeDetector from "react-resize-detector";
import { Dropdown, SplitButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
/**--------Props---------------
 * files: array of files in current project
 */

export default class FileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFile: "New File",
      isSmall: false,
    };
    this.fileview = React.createRef();
  }
  onFileShow = index => {
    this.props.showfile(index);
  };
  handleNewFile = () => {
    this.props.openNewModal();
  };
  rename = index => {
    this.props.openUpdateModal(index, this.props.langs[index], this.props.files[index]);
  };
  delete = index => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Are you sure?</h1>
            <p> Do you really want to delete this file?</p>
            <Button variant="secondary" onClick={onClose}>
              No
            </Button>
            <Button
              varient="danger"
              onClick={() => {
                this.props.deleteFile(index);
                onClose();
              }}
            >
              Yes, Delete it!
            </Button>
          </div>
        );
      },
    });
  };
  render() {
    return (
      <ReactResizeDetector handleWidth>
        {({ width }) => (
          <div className="file-view" ref={this.fileview}>
            <div className="file-list">
              <ul>
                {this.props.files
                  ? this.props.files.map((file, index) => (
                      <li key={index}>
                        <SplitButton
                          drop="down"
                          className={"file-link " + (index === this.props.current ? "active" : "")}
                          onClick={() => {
                            this.onFileShow(index);
                          }}
                          title={file}
                          variant="secondary"
                          id={`dropdown-button-drop-${index}`}
                        >
                          <Dropdown.Item as="button" onClick={() => this.rename(index)}>
                            Rename
                          </Dropdown.Item>
                          <Dropdown.Item as="button" onClick={() => this.delete(index)}>
                            Delete
                          </Dropdown.Item>
                        </SplitButton>
                      </li>
                    ))
                  : ""}
              </ul>
            </div>
            <div className="new-file-button-wrapper">
              <ViewportAwareButton
                className="mx-2 new-file"
                color="success"
                size="lg"
                onClick={this.handleNewFile}
                isSmall={width <= 190}
                icon={<FontAwesomeIcon icon={faPlus} />}
                text={this.state.newFile}
              />
            </div>
          </div>
        )}
      </ReactResizeDetector>
    );
  }
}
