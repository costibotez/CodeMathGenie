import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import DropdownButtonContainer from "../containers/DropdownButtonContainer";
import "../../../styles/FileModal.scss";

export class FileModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      file: "",
      submitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onclose = this.onclose.bind(this);
    this.onSave = this.onSave.bind(this);
    this.oninit = this.oninit.bind(this);
  }
  handleChange(event) {
    const { value } = event.target;
    this.setState({
      file: value,
    });
  }
  onclose() {
    this.props.closeModal();
  }
  onSave() {
    this.setState({ submitted: true });
    if (this.state.file) {
      if (this.props.isNew) {
        this.props.addNewFile(this.props.data.lang, this.state.file);
      } else {
        this.props.renameFile(this.props.data.index, this.props.data.lang, this.state.file);
      }
      this.props.setCurrentDirty(true);
      this.onclose();
    }
  }
  oninit() {
    if (this.props.isNew) {
      this.setState({ file: "", submitted: false });
    } else {
      this.setState({
        file: this.props.data.file.replace("." + this.props.data.lang, ""),
        submitted: false,
      });
    }
  }
  render() {
    const { isOpen, isNew } = this.props;
    const { file, submitted } = this.state;

    return (
      <Modal
        show={isOpen}
        onShow={this.oninit}
        onHide={this.onclose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        id="new-file-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isNew ? "Add New File" : "Rename File"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DropdownButtonContainer />
          <div className={"file-name-input " + (submitted && !file ? " has-error" : "")}>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={file}
              onChange={this.handleChange}
              placeholder="File Name"
            />
            {submitted && !file && <div className="help-block">File Name is required</div>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onclose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSave}>
            {isNew ? "Create" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
