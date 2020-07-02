import { OPEN_USER_MODAL } from "../actions/userModalActions";

const initialStatus = {
  isOpen: false,
};

function userModalReducer(state = initialStatus, action) {
  switch (action.type) {
    case OPEN_USER_MODAL:
      return { ...state, isOpen: action.isOpen };
    default:
      return state;
  }
}

export default userModalReducer;
