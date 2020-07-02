import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./styles/global.scss";
import Root from "./components/containers/AppContainer.js";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware } from "redux";
import appReducers from "./reducers";
import config from "./firebase";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import * as firebase from "firebase/app";
import { createLogger } from "redux-logger";

firebase.initializeApp(config);
let store = createStore(appReducers, applyMiddleware(thunkMiddleware));
if (process.env.REACT_APP_FS_PROJ !== "prod") {
  
  const loggerMiddleware = createLogger();
  store = createStore(appReducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
}

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root"),
);

registerServiceWorker();
