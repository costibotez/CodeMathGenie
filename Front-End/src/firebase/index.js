// import {auth.FacebookAuthProvider} from "firebase";
import * as firebase from "firebase/app";
import "firebase/auth";

// export const provider = new auth.FacebookAuthProvider();
export const provider = new firebase.auth.FacebookAuthProvider();

let config = {
  "apiKey": "AIzaSyA6VnNJ-xC165rP52PaszJ1W824DSJ7hSI",
  "authDomain": "icodegenie.firebaseapp.com",
  "databaseURL": "https://icodegenie.firebaseio.com",
  "projectId": "icodegenie",
  "storageBucket": "icodegenie.appspot.com"
};

if (process && process.env) {
  if (process.env.REACT_APP_FS_PROJ === "staging") {
    config = {
      "apiKey": "AIzaSyA6VnNJ-xC165rP52PaszJ1W824DSJ7hSI",
      "authDomain": "icodegenie.firebaseapp.com",
      "databaseURL": "https://icodegenie.firebaseio.com",
      "projectId": "icodegenie",
      "storageBucket": "icodegenie.appspot.com"
    };
  }
  if (process.env.REACT_APP_FS_PROJ === "prod") {
    config = {
      "apiKey": "AIzaSyA6VnNJ-xC165rP52PaszJ1W824DSJ7hSI",
      "authDomain": "icodegenie.firebaseapp.com",
      "databaseURL": "https://icodegenie.firebaseio.com",
      "projectId": "icodegenie",
      "storageBucket": "icodegenie.appspot.com"
    };
  }
}

export default config;
