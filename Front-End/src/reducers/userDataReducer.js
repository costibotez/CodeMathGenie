import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_BY_NAME_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_BY_NAME_SUCCESS,
  SET_USER_DATA_REQUEST,
  SET_USER_DATA_SUCCESS,
  USER_DATA_FAILURE,
  CLEAR_USER_DATA,
} from "../actions/userDataActions";

const initialState = {
  status: "",
  error: "",
  uid: "",
  name: "",
  email: null,
  location: "",
  role: "user",
  active: false,
  projects: [],
  phoneNumber: null,
  photoURL: null,
  username: ""
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA_SUCCESS:
    case GET_USER_DATA_BY_NAME_SUCCESS:
    case SET_USER_DATA_SUCCESS:
      return {
        status: action.status,
        uid: action.userData.uid,
        role: action.userData.role,
        projects: action.userData.projects,
        name: action.userData.name,
        email: action.userData.email,
        active: action.userData.active,
        location: action.userData.location,
        phoneNumber: action.userData.phoneNumber,
        photoURL: action.userData.photoURL,
        username: action.userData.username,
      };
    case GET_USER_DATA_REQUEST:
    case GET_USER_DATA_BY_NAME_REQUEST:
    case SET_USER_DATA_REQUEST:
      return { ...state, error: "", status: "loading" };
    case USER_DATA_FAILURE:
      return { error: action.error };
    case CLEAR_USER_DATA:
      return initialState;
    default:
      return state;
  }
}
export default userDataReducer;
