import React from "react";
import { Link } from "react-router-dom";
import "styles/SketchBox.scss";

import { faHtml5 } from "@fortawesome/free-brands-svg-icons";
import { faCss3 } from "@fortawesome/free-brands-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SketchBox extends React.Component {
  render() {
    const lang_icon = {
      html: faHtml5,
      js: faJs,
      css: faCss3,
    };
    return (
      <div className="sketch-box">
        <Link 
          className="sketch-box-body" 
          to={ this.props.username ? { pathname: "/public/" + this.props.username + '/' + this.props.id } : { pathname: "/load/" + this.props.id } }
          target={ this.props.username ? "_blank" : "_self" }
        >
          <div className="sketch-box-head">
            <img
              alt={"User's sketch icon"}
              src={`${process.env.PUBLIC_URL}/img/sketch-thumbnails/${this.props.img}.svg`}
              className="sketch-thumbnail mt-2"
            />
            <div className="sketch-metadata">  
              {
                this.props.langs_used ? this.props.langs_used.map((lang, index) => <FontAwesomeIcon className="sketch-icon" icon={lang_icon[lang]} key={index} />) : ""
              }
            </div>
          </div>
          <hr className="sketch-divider" />
          <div className="sketch-name">
            {this.props.name}
          </div>
        </Link>
      </div>
    );
  }
}

export default SketchBox;
