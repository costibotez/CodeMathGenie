import React from "react";
import { Button } from "reactstrap";
import { RingLoader } from "react-spinners";
import * as firebase from "firebase/app";
import "firebase/auth";
import "styles/Login.scss";

/**-------Props--------
 * provider: Firebase Provider that allows the app to do Facebook Logins
 */

export default class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMsg: "",
      waiting: false,
    };
  }

  //===========React Lifecycle Functions============//
  componentDidMount() {}

  handleEmailLogin = e => {
    this.setState({ waiting: true, errorMsg: "" });
    const _this = this;
    e.preventDefault(); //prevents page from reloading after submitting form

    firebase
      .auth()
      .signInWithPopup(this.props.provider)
      .then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
      })
      .catch(function(err) {
        // Handle Errors here.
        console.error(err);
        let newMsg = err.message;
        switch (err.code) {
          case "auth/invalid-email":
            newMsg =
              "Invalid username. Usernames must only have alphanumeric characters plus !@#$%.";
            break;
          case "auth/user-not-found":
            newMsg = "No account found for username.";
            break;
          case "auth/wrong-password":
            newMsg = "Invalid password provided.";
            break;
          case "auth/network-request-failed":
            newMsg = "Network error - check your internet connection.";
            break;
          case "auth/app-deleted":
          case "auth/app-not-authorized":
          case "auth/argument-error":
          case "auth/invalid-api-key":
          case "auth/operation-not-allowed":
          case "auth/requires-recent-login":
          case "auth/unauthorized-domain":
            newMsg =
              "App was not properly configured. Please contact administrator. Error: " + err.code;
            break;
          case "auth/invalid-user-token":
          case "auth/user-disabled":
          case "auth/user-token-expired":
          case "auth/web-storage-unsupported":
            newMsg = "Issue with user. Please contact administrator. Error: " + err.code;
            break;
          default:
            newMsg = "Failed to sign in: " + err.code;
        }
        _this.setState({ errorMsg: newMsg, waiting: false });
      });
  };

  renderErrorMessage = (msg, addBreak) => {
    if (msg)
      return (
        <span>
          <div className="login-form-input-error">{msg}</div>
          {addBreak ? <br /> : null}
        </span>
      );

    return <br />;
  };

  renderAction = () => {
    if (this.state.waiting) {
      return (
        <div className="login-form-loader">
          <RingLoader color={"#857e8f"} size={50} loading={true} />
        </div>
      );
    } else {
      /* We've disabled the social button for now, but here it is.
        <SocialButton
          imgSrc="/img/fbLogo1.png"
          bgColor="#4267b2"
          textColor="white"
          value="Login with Facebook"
          handleLogin={this.handleSocialLogin}
        />
      */
      return (
        <Button className="login-form-button" size="lg" type="submit">
          <span className="google-img-wrapper">
            <img
              className="google-idp-icon"
              alt=""
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            />
          </span>
          <span className="google-text">Sign in with Google</span>
        </Button>
      );
    }
  };

  render() {
    return (
      <div className="login-form-container">
        <form className="login-form" onSubmit={this.handleEmailLogin}>
          {this.renderAction()}
          {this.renderErrorMessage(this.state.errorMsg)}
        </form>
      </div>
    );
  }
}
