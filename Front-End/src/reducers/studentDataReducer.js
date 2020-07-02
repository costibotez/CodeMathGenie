import {
  GET_STUDENT_DATA_REQUEST,
  GET_STUDENT_DATA_SUCCESS,
  SET_STUDENT_DATA_REQUEST,
  SET_STUDENT_DATA_SUCCESS,
  STUDENT_DATA_FAILURE,
  CLEAR_STUDENT_DATA,
} from "../actions/studentDataActions";

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

function studentDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_DATA_SUCCESS:
    case SET_STUDENT_DATA_SUCCESS:
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
    case GET_STUDENT_DATA_REQUEST:
    case SET_STUDENT_DATA_REQUEST:
      return { ...state, error: "", status:"loading" };
    case STUDENT_DATA_FAILURE:
      return { error: action.error };
    case CLEAR_STUDENT_DATA:
      return initialState;
    default:
      return state;
  }
}
export default studentDataReducer;
