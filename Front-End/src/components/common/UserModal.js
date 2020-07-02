import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, DropdownButton, Col, Row, Container } from "react-bootstrap";
import Select from 'react-select';
import { LOCATIONS, LOCATIONS_OPTIONS } from "../../constants";
import "styles/UserModal.scss";
export class UserModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      submitted: false,
      isNew: "",
      name: "",
      email: "",
      location: "",
      active: "",
      role: "",
      username: "",
    };
  }
  generateUserName = (email) => {
    let username = email ? email.substr(0, email.indexOf('@')) : "";
    if (this.props.users.filter(item => item.id !== this.props.Data.id && item.username && item.username === username).length) {
      username = username.concat((Math.floor(1000 + Math.random() * 9000)).toString());
    }
    return username;
  }
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };
  handleEmailChange = event => {
    const { value } = event.target
    this.setState({ email: value, username: this.generateUserName(value) });
  };
  onclose = () => {
    this.props.openModal(false);
  };
  onSave = () => {
    this.setState({ submitted: true });
    let location = LOCATIONS[0];
    if (Array.isArray(this.state.location)) {
      location = this.state.location.map(l => l.value);
    } else if(this.state.location) {
      location = this.state.location.value;
    }
    if (this.state.name && this.state.email) {
      if (this.state.isNew) {
        this.props.addNewUser({
          name: this.state.name,
          email: this.state.email,
          location: location,
          active: this.state.active,
          role: this.state.role ? this.state.role : "user",
          username: this.state.username
        });
      } else {
        this.props.updateUser({
          id: this.props.Data.id,
          name: this.state.name,
          email: this.state.email,
          location: location,
          active: this.state.active,
          role: this.state.role ? this.state.role : "user",
          username: this.state.username
        });
      }
      this.props.openModal(false);
    }
  };
  oninit = () => {
    if (this.props.isOpen) {
      let location;
      if (Array.isArray(this.props.Data.location)) {
        location = this.props.Data.location.map(item=> ({value: item, label: item}));
      } else {
        location = {value: this.props.Data.location, label: this.props.Data.location};
      }
      this.setState({
        isNew: this.props.isNew,
        name: this.props.Data.name ? this.props.Data.name : "",
        email: this.props.Data.email ? this.props.Data.email : "",
        location: location,
        active: this.props.Data.active,
        role: this.props.Data.role,
        submitted: false,
        username: this.props.Data.username ? this.props.Data.username : this.generateUserName(this.props.Data.email ? this.props.Data.email : "")
      });
    }
  };
  setlocation = loc => {
    this.setState({ location: loc });
  };
  setpermission = perm => {
    this.setState({ active: perm });
  };
  setrole = rol => {
    this.setState({ role: rol });
  };
  render() {
    const { name, email, location, active, role, isNew, submitted, username } = this.state;
    const { isOpen } = this.props;
    return (
      <Modal
        show={isOpen}
        onShow={this.oninit}
        onHide={this.onclose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        id="user-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {isNew ? "Add new User" : "Update User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <div className={"user-data-input " + (submitted && !name ? " has-error" : "")}>
                  <label>
                    <span>Full Name:</span>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      placeholder="Full Name"
                    />
                  </label>
                  {submitted && !name && <div className="help-block">Full Name is required</div>}
                </div>
                <div className={"user-data-input " + (submitted && !email ? " has-error" : "")}>
                  <label>
                    <span>Email:</span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={this.handleEmailChange}
                      placeholder="demo@example.com"
                    />
                  </label>
                  {submitted && !email && <div className="help-block">Email is required</div>}
                </div>
                <div className={"user-data-input " + (submitted && !email ? " has-error" : "")}>
                  <label>
                    <span>UserName:</span>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      placeholder="demo"
                      disabled
                    />
                  </label>
                </div>
              </Col>
              <Col>
                <div className="user-data-drop">
                  <span>Permission:</span>
                  <DropdownButton
                    variant="secondary"
                    id="dropdown-permission-button"
                    title={active ? "Active" : "Disable"}
                  >
                    <Dropdown.Item as="button" onClick={() => this.setpermission(true)}>
                      Active
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => this.setpermission(false)}>
                      Disable
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="user-data-drop">
                  <span>Role:</span>
                  <DropdownButton
                    variant="secondary"
                    id="dropdown-role-button"
                    title={role && role === "admin" ? "Manager" : "User"}
                  >
                    <Dropdown.Item as="button" onClick={() => this.setrole("admin")}>
                      Manager
                    </Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => this.setrole("user")}>
                      User
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
                <div className="location-form">
                  <span>Location:</span>
                  <Select
                    className="location-field"
                    value={location ? location : { value: LOCATIONS[0], label: LOCATIONS[0] } }
                    onChange={(items) => this.setlocation(items)}
                    options={LOCATIONS_OPTIONS}
                    isMulti={true}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.onclose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.onSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
