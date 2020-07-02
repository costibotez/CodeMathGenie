import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "styles/Page.scss";

class Error extends React.Component {
  logout = () => {
    firebase.auth().signOut();
    this.props.clearUserData();
  };
  render() {
    return (
      <div className="page-container">
        {this.props.isDisabledUser ? (
          <h2>You are not activated by Manager!</h2>
        ) : (
          <div>
            <h2>Uh oh, something went wrong!</h2>
            <h1>Error: {this.props.errorMsg}</h1>
            <br />
            <Link to="/">
              <Button color="success" size="lg">
                Back to safety
              </Button>
            </Link>
          </div>
        )}
        &nbsp;
        {(this.props.isValidUser || this.props.isDisabledUser) && (
          <Button color="danger" size="lg" onClick={() => this.logout()}>
            Log Out
          </Button>
        )}
      </div>
    );
  }
}
export default Error;
