import React from "react";
import "styles/Menu.scss";
import { NavLink } from "react-router-dom";
import { Navbar, Dropdown, Nav, Container, NavDropdown } from "react-bootstrap";
// import logo from "../../img/logo.png";
/**--------Props--------
 * togglePanel: function to be called when the panel is collapsed or opened
 */
class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false,
      dropExpanded: false
    };
  }
  setNavExpanded = expanded => {
    this.setState({ navExpanded: expanded });
  };
  setDropExpanded = expanded => {
    this.setState({ dropExpanded: expanded });
  };
  closeNav = () => {
    this.setState({ navExpanded: false });
  };
  closeDrop = () => {
    this.setState({ dropExpanded: false });
  };
  render() {
    const locations = Array.isArray(this.props.location) ? this.props.location : [this.props.location];
    let myUsers = [];
    this.props.users.forEach(doc => {
        if (locations.includes(doc.location) && doc.role !== "admin" && doc.active) {
            myUsers.push(doc);   
        }
    });
    myUsers = myUsers.sort((a,b) => a.name > b.name ? 1 : -1);
    return (
      <Navbar
        bg="dark"
        className="menu"
        expand="xl"
        variant="dark"
        fixed="top"
        onToggle={this.setNavExpanded}
        expanded={this.state.navExpanded}
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              className="logo-img"
              alt="logo"
              src="https://www.mathgenie.com/hs-fs/hubfs/assets/logo.png?width=292&name=logo.png"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" id="toggler-button" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavLink to="/" as={Nav.Link} className="menu-item" onClick={this.closeNav}>
                {" "}
                Home{" "}
              </NavLink>
              <NavLink to="/create" as={Nav.Link} className="menu-item" onClick={this.closeNav}>
                {" "}
                Create{" "}
              </NavLink>
              <NavLink to="/projects" as={Nav.Link} className="menu-item" onClick={this.closeNav}>
                {" "}
                My Projects{" "}
              </NavLink>
              {this.props.role && this.props.role === "admin" ? (
                <>
                  <NavLink to="/admin" as={Nav.Link} className="menu-item" onClick={this.closeNav}>
                    {" "}
                    Manager{" "}
                  </NavLink>
                  <NavDropdown title="Students" onToggle={this.setDropExpanded} show={this.state.dropExpanded}>
                    {
                      myUsers.map(({ name, id}) =>  (<NavLink key={id} to={{ pathname: "/student/" + id }} className="users-box" onClick={()=> {this.closeNav(); this.closeDrop();}}>{name}</NavLink>))
                    }
                  </NavDropdown>
                </>
              ) : (
                ""
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Dropdown className="menu-right">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="btn-circle btn-md btn-back"
            style={{ backgroundImage: `url(${this.props.photoURL})` }}
          />
          <Dropdown.Menu alignRight>
            <Dropdown.Header>{this.props.profileName}</Dropdown.Header>
            <Dropdown.Header>{this.props.email}</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item as="button" onClick={() => this.props.logout()}>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    );
  }
}

export default Menu;
