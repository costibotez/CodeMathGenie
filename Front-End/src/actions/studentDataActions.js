import * as fetch from "../lib/fetch.js";

export const GET_STUDENT_DATA_REQUEST = "GET_STUDENT_DATA_REQUEST";
export const GET_STUDENT_DATA_SUCCESS = "GET_STUDENT_DATA_SUCCESS";
export const STUDENT_DATA_FAILURE = "STUDENT_DATA_FAILURE";
export const SET_STUDENT_DATA_REQUEST = "SET_STUDENT_DATA_REQUEST";
export const SET_STUDENT_DATA_SUCCESS = "SET_STUDENT_DATA_SUCCESS";
export const CLEAR_STUDENT_DATA = "CLEAR_STUDENT_DATA";
export function getStudentData(uid) {
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
          dispatch(studentDataFailure(data.error));
        }
        dispatch(success(data.status, data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(studentDataFailure(err));
      });
  };
  function request() {
    return { type: GET_STUDENT_DATA_REQUEST };
  }
  function success(status, userData) {
    return { type: GET_STUDENT_DATA_SUCCESS, status: status, userData: userData };
  }
}
export function setStudentData(uid, displayName, email, phoneNumber, photoURL) {
  // add uid to the userData object
  return async dispatch => {
    dispatch(request());
    fetch
      .setUserData(uid, displayName, email, phoneNumber, photoURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(data.status, data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(studentDataFailure(err));
      });
  };
  function request() {
    return { type: SET_STUDENT_DATA_REQUEST };
  }
  function success(status, userData) {
    return { type: SET_STUDENT_DATA_SUCCESS, status: status, userData: userData };
  }
}
export function studentDataFailure(error) {
  return {
    type: STUDENT_DATA_FAILURE,
    error: typeof error === "string" ? error : JSON.stringify(error),
  };
}
export function clearStudentData() {
  return { type: CLEAR_STUDENT_DATA };
}
