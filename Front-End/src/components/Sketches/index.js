import React from "react";
import SketchBox from "./components/SketchBox";
import SortRadio from "./components/SortRadio";
import { SketchThumbnailArray, SORT_BY_NAME } from "./constants";
import "styles/Sketches.scss";

import { Link } from "react-router-dom";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Grid, Row, Col } from "react-flexbox-grid";
import Loading from "components/common/LoadingPage.js";

class Sketches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort_method: SORT_BY_NAME,
      sort_direction: 0,
    };
    if (this.props.userID) {
      this.props.getStudentData(this.props.userID);
    } else if (this.props.username) {
      this.props.getUserDataByName(this.props.username);
    } else {
      this.props.getUserData(this.props.myuid);
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.userID && this.props.userID !== nextProps.userID ) {
      this.props.getStudentData(nextProps.userID);
    }
  }
  getRandomSketchThumbnail = () => {
    return SketchThumbnailArray[Math.floor(Math.random() * SketchThumbnailArray.length)];
  };
  getThumbnailSrc = val => {
    if (val === undefined || val === "" || val >= SketchThumbnailArray.length || val < 0) {
      return this.getRandomSketchThumbnail();
    }
    return SketchThumbnailArray[val];
  };

  renderHeader = () => {
    if (this.isProjectEmpty()) {
      return "";
    }
    if (this.props.username) {
      return (
        <div className="sketches-public-header">
          <h2>Hello I'm {this.props.myname}.</h2>
          <h2>I am learning to code with Math Genie's coding program.</h2>
          <h2>Here are some of my projects.</h2>
        </div>
      );
    }
    return (
      <div className="sketches-header">
        <div className="sketches-header-text">
          {this.props.userID ? this.props.studentName + "'s Projects" : "My Projects"}
        </div>
      </div>
    );
  };
  updateSortMode = mode => {
    this.setState({ sort_method: mode });
  };
  toggleSortDirection = () => {
    this.setState({ sort_direction: 1 - this.state.sort_direction });
  };
  isProjectEmpty = () => {
    if (this.props.userID && (!this.props.studentProjects || this.props.studentProjects.length === 0)) {
      return true;
    }
    if (!this.props.userID && (!this.props.myProjects || this.props.myProjects.length === 0)) {
      return true;
    }
    if (!this.props.userID && this.props.username && (this.props.myProjects.filter(item => item.isPublic).length === 0)) {
      return true;
    }
    return false;
  }
  renderSortMethod = () => {
    if (this.isProjectEmpty()) {
      return "";
    }
    return (
      <div className={"sort-method " + (this.props.username ? "public" : "")}>
        <button className="sort-direction" onClick={this.toggleSortDirection}>
          Sort By{" "}
          {this.state.sort_direction ? (
            <FontAwesomeIcon className="sort-icon" icon={faArrowUp} />
          ) : (
            <FontAwesomeIcon className="sort-icon" icon={faArrowDown} />
          )}
        </button>
        <SortRadio sortMode={this.state.sort_method} updateSortMode={this.updateSortMode} />
      </div>
    );
  };

  sortFunction = (a, b) => {
    let temp_a;
    let temp_b;
    switch (this.state.sort_method) {
      case 1:
        temp_a = a.created_at;
        temp_b = b.created_at;
        break;
      case 2:
        temp_a = a.updated_at;
        temp_b = b.updated_at;
        break;
      case 0:
      default:
        temp_a = a.name;
        temp_b = b.name;
        break;
    }
    if (temp_a < temp_b) return this.state.sort_direction ? 1 : -1;
    if (temp_a === temp_b) return 0;
    return this.state.sort_direction ? -1 : 1;
  };
  renderSketches = () => {
    let newList = this.props.myProjects;
    if (this.props.userID) {
      newList = this.props.studentProjects;
    } else if (this.props.username) {
      newList = this.props.myProjects.filter(item => item.isPublic);
    }
    if (!newList || newList.length === 0) {
      if (this.props.userID) {
        return (
          <div className="no-sketches-container">
            <h2>No Projects for this student.</h2>  
          </div>
        );
      }
      if (this.props.username) {
        return (
          <div className="no-sketches-container">
            <h2>No Public Projects for this user.</h2>  
          </div>
        );
      }
      return (
        <div className="no-sketches-container">
          <h2>There's nothing here! Why don't you try creating a project?</h2>
          <br />
          <p>
            <Link to="/create" className="btn btn-primary btn-lg">
              Create A Project
            </Link>
          </p>
        </div>
      );
    }
    newList.sort(this.sortFunction);
    return (
      <div className="sketches-grid-container">
        <Grid fluid>
          <Row>
            {newList.map(({ name, id, thumbnail, langs_used }) => (
              <Col key={id}>
                <SketchBox
                  img={this.getThumbnailSrc(thumbnail)}
                  langs_used={langs_used}
                  name={name}
                  id={id}
                  key={id}
                  username={this.props.username}
                />
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    );
  };

  render() {
    if ((this.props.userID && this.props.studentStatus === "loading") || (!this.props.userID && this.props.myStatus === "loading")) {
      return <Loading/>;
    }    
    return (
      <div className="sketches-container">
        {this.renderHeader()}
        {this.renderSketches()}
        {this.renderSortMethod()}
      </div>
    );
  }
}

export default Sketches;
