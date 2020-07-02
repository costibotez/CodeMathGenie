import { fileeditConstants } from "../constants/fileedit.constants";

const initialStatus = {
  isOpen: false,
  isNew: true,
  lang: "html",
  file: "",
  index: null,
};

function fileeditReducer(state = initialStatus, action) {
  switch (action.type) {
    case fileeditConstants.OPEN_NEW_MODAL:
      return { ...state, isOpen: true, isNew: true, lang: "html" };
    case fileeditConstants.OPEN_UPDATE_MODAL:
      return {
        ...state,
        isOpen: true,
        isNew: false,
        index: action.index,
        lang: action.lang,
        file: action.file,
      };
    case fileeditConstants.CLOSE_MODAL:
      return { isOpen: false };
    case fileeditConstants.SELECT_LANGUAGE_NEW:
      return { ...state, lang: action.lang };
    default:
      return state;
  }
}

export default fileeditReducer;
