import {
  SCREEN_RESIZE,
  TOGGLE_PANEL,
  SET_PANEL,
  TOGGLE_CONSOLE_PANEL,
  SPLIT_PANE_DRAGGING,
} from "../actions/uiActions";

const initialState = {
  screenWidth: typeof window === "object" ? window.innerWidth : null,
  screenHeight: typeof window === "object" ? window.innerHeight : null,
  panelOpen: false,
  consolePanelOpen: false,
  isDragging: false,
};

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SCREEN_RESIZE:
      return Object.assign({}, state, { screenWidth: action.width, screenHeight: action.height });
    case TOGGLE_PANEL:
      return Object.assign({}, state, { panelOpen: !state.panelOpen });
    case TOGGLE_CONSOLE_PANEL:
      return Object.assign({}, state, { consolePanelOpen: !state.consolePanelOpen });
    case SET_PANEL:
      return Object.assign({}, state, { panelOpen: action.value });
    case SPLIT_PANE_DRAGGING:
      return Object.assign({}, state, { isDragging: action.isDragging });
    default:
      return state;
  }
}

export default uiReducer;
