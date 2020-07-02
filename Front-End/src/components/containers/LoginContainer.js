import Login from '../Login.js'
import {connect} from 'react-redux'
import * as firebase from "firebase/app";

const mapStateToProps = (state, ownProps) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  return {
    loggedIn: state.userData,
    provider: provider
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const LoginPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default LoginPage;
