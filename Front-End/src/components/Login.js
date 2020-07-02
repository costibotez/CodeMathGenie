import React from "react";
import "styles/Login.scss";
import LoginForm from "./Login/LoginForm";
import logo from "img/logo.png";

/**--------Props--------
 * provider: Facebook Provider used to login with Facebook
 */

class Login extends React.Component {
  /**
   * constructor - sets initial state
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderMainContent = () => {
    return (
      <div className="login-page-content" style={{ backgroundImage: `url(${logo})` }}>
        <LoginForm provider={this.props.provider} />
      </div>
    );
  };

  render() {
    return (
      <div className="login-page">
        {this.renderMainContent()}
      </div>
    );
  }
}

export default Login;
