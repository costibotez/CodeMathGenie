import * as fetch from "../lib/fetch.js";

export const GET_USERS_LIST_SUCCESS = "GET_USERS_LIST_SUCCESS";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const USERS_LIST_REQUEST = "USERS_LIST_REQUEST";
export const USERS_LIST_FAILURE = "USERS_LIST_FAILURE";
export const CLEAR_USERS_LIST = "CLEAR_USERS_LIST";
export function getUsersList() {
  return async dispatch => {
    dispatch(usersListRequest());
    fetch
      .getUsersList()
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(data.usersList));
      })
      .catch(err => {
        console.log(err);
        dispatch(usersListFailure(err));
      });
  };
  function success(usersList) {
    return { type: GET_USERS_LIST_SUCCESS, users: usersList };
  }
}
export function addNewUser(userData) {
  return async dispatch => {
    dispatch(usersListRequest());
    fetch
      .setCertainUserData(userData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(usersListFailure(err));
      });
  };
  function success(userData) {
    return { type: ADD_USER_SUCCESS, userData: userData };
  }
}
export function updateUser(userData) {
  return async dispatch => {
    dispatch(usersListRequest());
    fetch
      .setCertainUserData(userData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        dispatch(success(data.userData));
      })
      .catch(err => {
        console.log(err);
        dispatch(usersListFailure(err));
      });
  };
  function success(userData) {
    return { type: UPDATE_USER_SUCCESS, userData: userData };
  }
}
export function usersListRequest() {
  return { type: USERS_LIST_REQUEST };
}
export function usersListFailure(error) {
  return {
    type: USERS_LIST_FAILURE,
    error: typeof error === "string" ? error : JSON.stringify(error),
  };
}
export function clearUsersList() {
  return { type: CLEAR_USERS_LIST };
}
