import * as fetch from "../lib/fetch.js";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_BY_NAME_REQUEST = "GET_USER_DATA_BY_NAME_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_BY_NAME_SUCCESS = "GET_USER_DATA_BY_NAME_SUCCESS";
export const USER_DATA_FAILURE = "USER_DATA_FAILURE";
export const SET_USER_DATA_REQUEST = "SET_USER_DATA_REQUEST";
export const SET_USER_DATA_SUCCESS = "SET_USER_DATA_SUCCESS";
export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
export function getUserData(uid) {
  // add uid to the userData object
  return async dispatch => {
    dispatch(request());
    fetch
      .getUserData(uid)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          dispatch(userDataFailure(data.error));
        }
        dispatch(success(data.status, data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(userDataFailure(err));
      });
  };
  function request() {
    return { type: GET_USER_DATA_REQUEST };
  }
  function success(status, userData) {
    return { type: GET_USER_DATA_SUCCESS, status: status, userData: userData };
  }
}
export function getUserDataByName(username) {
  // add uid to the userData object
  return async dispatch => {
    dispatch(request());
    fetch
      .getUserDataByName(username)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.error) {
          dispatch(userDataFailure(data.error));
        }
        dispatch(success(data.status, data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(userDataFailure(err));
      });
  };
  function request() {
    return { type: GET_USER_DATA_BY_NAME_REQUEST };
  }
  function success(status, userData) {
    return { type: GET_USER_DATA_BY_NAME_SUCCESS, status: status, userData: userData };
  }
}
export function setUserData(uid, displayName, email, phoneNumber, photoURL) {
  // add uid to the userData object
  return async dispatch => {
    dispatch(request());
    fetch
      .setUserData(uid, displayName, email, phoneNumber, photoURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (!data.error) {
          dispatch(success(data.status, data.userData));
        } else {
          dispatch(userDataFailure(data.error));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(userDataFailure(err));
      });
  };
  function request() {
    return { type: SET_USER_DATA_REQUEST };
  }
  function success(status, userData) {
    return { type: SET_USER_DATA_SUCCESS, status: status, userData: userData };
  }
}
export function userDataFailure(error) {
  return {
    type: USER_DATA_FAILURE,
    error: typeof error === "string" ? error : JSON.stringify(error),
  };
}
export function clearUserData() {
  localStorage.removeItem('user');
  return { type: CLEAR_USER_DATA };
}
