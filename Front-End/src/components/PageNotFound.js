import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "styles/Page.scss";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page-container">
        <span>Error: 404</span>
        <h1>Uh oh, page not found!</h1>
        <br />
        <Link to="/">
          <Button color="success" size="lg">
            Back to safety
          </Button>
        </Link>
      </div>
    );
  }
}
export default Error;
