import React from "react";
import EditorContainer from "./Editor/containers/EditorContainer";
import SketchesContainer from "./Sketches/containers/SketchesContainer";
import "styles/Main.scss";
import HistoryPanelContainer from "./common/containers/HistoryPanelContainer";
import AdminContainer from "../components/containers/AdminContainer";
import Menu from "./common/Menu";
import ReduxToastr from "react-redux-toastr";
import { Link } from "react-router-dom";
import { Grid, Row, Col } from "react-flexbox-grid";
import * as firebase from "firebase/app";
import { confirmAlert } from "react-confirm-alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Button } from "reactstrap";
import "firebase/auth";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.contentType === "home" && this.props.role === "admin")  {
      this.props.getUsersList();
    }
  }
  onPublic = () => {
    const url = window.location.href;
      const arr = url.split("/");
      const link = arr[0] + "//" + arr[2] + "/public/" + this.props.username;
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="publish-ui">
              <h1>Please copy the link below</h1>
              <p> {link} </p>
              <CopyToClipboard text={link}>
                <Button variant="primary" onClick={onClose}>
                  Copy the link
                </Button>
              </CopyToClipboard>
            </div>
          );
        },
      });
  }
  renderSketchesPage = () => (this.props.userID ? <SketchesContainer userID={this.props.userID}/> : <SketchesContainer />);

  renderHome = () => {
    if (this.props.role === "admin") {
      const locations = Array.isArray(this.props.location) ? this.props.location : [this.props.location];
      let myUsers = [];
      this.props.users.forEach(doc => {
          if (locations.includes(doc.location) && doc.role !== "admin" && doc.active) {
              myUsers.push(doc);   
          }
      });
      myUsers = myUsers.sort((a,b) => a.name > b.name ? 1 : -1);
      return (
        <div className="home-wrapper">
          <div className="home-users-page">
            <Grid fluid>
              <Row>
                {myUsers.map(({ name, id, photoURL }) => (
                  <Col key={id}>
                    <Link to={{ pathname: "/student/" + id }} className="users-box">
                      <img className="btn-circle" src={photoURL} alt={name}/>
                      <span>{name}</span>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Grid>
          </div>
        </div>
      );
    }
    return (
    <div className="home-page">
      <h1>Welcome{this.props.name ? " " + this.props.name : ""}!</h1>
      {this.props.recentProjects.length ? <h2>Recent Projects</h2> : ""}
      <div className="recent-project-list">
        <ul>
          {this.props.recentProjects
            ? this.props.recentProjects.map((project, index) => (
                <li key={index}>
                  <Link to={{ pathname: "/load/" + project.id }} className="project-link">
                    {project.name}
                  </Link>
                </li>
              ))
            : ""}
        </ul>
      </div>
      <Button className="public-btn" onClick={() => this.onPublic()}>Public Link</Button>
    </div>
    );
  }

  renderEditor = () => (
    <div className="main-editor">
      <EditorContainer projectID={this.props.projectID} /> <HistoryPanelContainer />
    </div>
  );
  renderAdmin = () => <AdminContainer />;
  renderContent = () => {
    switch (this.props.contentType) {
      case "projects":
        return this.renderSketchesPage();
      case "home":
        return this.renderHome();
      case "admin":
        return this.renderAdmin();
      case "editor":
      default:
        return this.renderEditor();
    }
  };

  logout = () => {
    const _this = this;
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          // Sign-out successful.
          _this.props.clearUserData();
        },
        function(error) {
          // An error happened.
          _this.props.userDataFailure(error);
        },
      );
  };
  render() {
    return (
      <div className="wrapper">
        <Menu
          photoURL={this.props.photoURL}
          logout={this.logout}
          profileName={this.props.username}
          email={this.props.email}
          role={this.props.role}
          location={this.props.location}
          users={this.props.users}
        />
        <div className="main">{this.renderContent()}</div>
        <ReduxToastr
          timeOut={3000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </div>
    );
  }
}

export default Editor;
