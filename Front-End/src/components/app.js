import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { ROUTER_BASE_NAME } from "../constants";
import LoginPage from "./containers/LoginContainer";
import MainContainer from "./containers/MainContainer";
import LoadingPage from "./common/LoadingPage";
import Error from "./Error";
import PageNotFound from "./PageNotFound";
import * as firebase from "firebase/app";
import "firebase/auth";
import "styles/app.scss";
import PublicContainer from "./containers/PublicContainer";
import SketchesContainer from "./Sketches/containers/SketchesContainer";

const provider = new firebase.auth.EmailAuthProvider();
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedAuth: false,
    };
  }

  //==============React Lifecycle Functions===================//

  componentDidMount = () => {
    if(window.location.pathname.includes("/public") === false) {
      firebase.auth().onAuthStateChanged(async user => {
        await this.onAuthHandler(user);
      });
    }
    window.addEventListener("resize", this.handleResize, true);
    const _this = this;
    window.addEventListener(
      "message",
      function(event) {
        if (
          !event.data.source &&
          event.data.type &&
          event.data.data &&
          (event.data.type === "Log" || event.data.type === "Warn" || event.data.type === "Error")
        ) {
          _this.props.addConsole(event.data);
        }
      },
      false,
    );
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.handleResize, true);
  };

  handleResize = () => {
    this.props.screenResize(window.innerWidth, window.innerHeight);
  };

  /**
   *  TODO: Consider reducing the numerous side effects of this function in favor of the one function, one purpose principle
   * onAuthHandler - on execution will set a flag checkedAuth to true. If a valid user is passed to the function,
   * onAuthHandler will attempt to load the metadata and account data corresponding to this account.  If the user
   * has not set their displayName, it will be set to "New User". If no user is passed, we clear any existng user data from the
   * application.
   * @param  {firebase.auth().currentUser}  user - a user object as passed by firebase.auth()
   */
  onAuthHandler = async user => {
    console.log("checking auth");
    if (user) {
      console.log("found user");
      const { uid, displayName, email, phoneNumber, photoURL } = user;
      if (uid) {
        this.setState({ checkedAuth: true });
        const idToken = await firebase.auth().currentUser.getIdToken(true);
        if (!idToken) {
          // Handle error
          console.log("Failed to get ID Token");
        } else {
          localStorage.setItem('user', idToken);
          await this.props.setUserData(uid, displayName, email, phoneNumber, photoURL);
        }
      } else {
        this.props.userDataFailure("Failed to load user data...");
        this.setState({ checkedAuth: true });
      }
    } else {
      console.log("no user found");
      this.setState({ checkedAuth: true });
    }
  };

  showErrorPage = err => {
    console.log(err);
    this.props.userDataFailure(err);
  };

  renderHome = isValidUser => {
    return isValidUser ? <Redirect to="/" /> : <Redirect to="/login" />;
  };

  render() {
    //if we haven't checked if the user is logged in yet, show a loading screen
    if (!this.state.checkedAuth && window.location.pathname.includes("/public") === false) {
      return <LoadingPage />;
    }

    //the user is not valid if there's no UID
    let isValidUser = this.props.uid;
    return (
      <Router basename={ROUTER_BASE_NAME}>
        <div className="App">
          <Switch>
            {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
            <Route
              exact
              path="/"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : isValidUser ? (
                  <MainContainer contentType="home" />
                ) : (
                  <LoginPage provider={provider} />
                )
              }
            />
            {/*if the user is loggedIn, redirect them to the editor, otherwise, show the login page*?*/}
            <Route
              path="/login"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : isValidUser ? (
                  <Redirect to="/" />
                ) : (
                  <LoginPage provider={provider} />
                )
              }
            />
            {/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
            <Route
              path="/create"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : !isValidUser ? (
                  <Redirect to="/login" />
                ) : (
                  <MainContainer contentType="editor" />
                )
              }
            />
            {/*if the user is not loggedIn, redirect them to the login page, otherwise, show the editor page*?*/}
            <Route
              path="/load/:projectID"
              render={props =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : !isValidUser ? (
                  <Redirect to="/login" />
                ) : (
                  <MainContainer contentType="editor" projectID={props.match.params.projectID} />
                )
              }
            />
            {/*if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*?*/}
            <Route
              path="/projects"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : isValidUser ? (
                  <MainContainer contentType="projects" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            {/*if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*?*/}
            <Route
              path="/student/:userID"
              render={props =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : isValidUser ? (
                  <MainContainer contentType="projects" userID={props.match.params.userID}/>
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            {/*if the user isn't loggedIn, redirect them to the login page, otherwise, show the view page*?*/}
            <Route
              path="/admin"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : isValidUser ? (
                  <MainContainer contentType="admin" />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            {/* Public URL for none logged in user*/}
            <Route
              path="/public/:username/:projectID"
              render={props =>
                !props.match.params.username && !props.match.params.projectID ? (
                  <Error errorMsg="Invalid URL" clearUserData={this.props.clearUserData} />
                ) : (
                  <PublicContainer
                    userName={props.match.params.username}
                    pID={props.match.params.projectID}
                  />
                )
              }
            />
            {/* Public URL for none logged in user*/}
            <Route
              path="/public/:username"
              render={props =>
                !props.match.params.username ? (
                  <Error errorMsg="Invalid URL" clearUserData={this.props.clearUserData} />
                ) : (
                  <SketchesContainer username={props.match.params.username}/>
                )
              }
            />
            {/* Default error page */}
            <Route
              path="/error"
              render={() =>
                (this.props.errorMsg && this.props.errorMsg !== "") || this.props.isDisabledUser ? (
                  <Error
                    errorMsg={this.props.errorMsg}
                    isValidUser={isValidUser}
                    isDisabledUser={this.props.isDisabledUser}
                    clearUserData={this.props.clearUserData}
                  />
                ) : (
                  this.renderHome(isValidUser)
                )
              }
            />

            {/* Matches all other paths */}
            <Route render={() => <PageNotFound />} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
