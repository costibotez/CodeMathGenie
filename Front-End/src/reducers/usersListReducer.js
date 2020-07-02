import {
  USERS_LIST_REQUEST,
  GET_USERS_LIST_SUCCESS,
  USERS_LIST_FAILURE,
  CLEAR_USERS_LIST,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
} from "../actions/usersListActions";

const initialState = {
  users: [],
  error: "",
};

function userDataReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_LIST_SUCCESS:
      return { users: action.users };
    case ADD_USER_SUCCESS:
      return { users: [...state.users, action.userData] };
    case UPDATE_USER_SUCCESS:
      return {
        users: state.users.map(user =>
          user.id === action.userData.id ? { ...action.userData } : user,
        ),
      };
    case USERS_LIST_REQUEST:
      return { ...state, error: "" };
    case USERS_LIST_FAILURE:
      return { error: action.error };
    case CLEAR_USERS_LIST:
      return initialState;
    default:
      return state;
  }
}
export default userDataReducer;
