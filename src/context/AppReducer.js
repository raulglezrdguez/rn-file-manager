import {
  LOGIN,
  LOGOUT,
  SET_FILES,
  UPDATE_FILES,
  UPLOAD_FILE,
  DELETE_FILE,
  SET_ALL_FILES,
  SET_DARKMODE,
  SWITCH_DARKMODE,
  SHOW_SNACKBAR_MESSAGE,
  CLOSE_SNACKBAR,
} from './types';

const AppReducer = (state, action) => {
  const {type, payload} = action;
  let darkMode = null;
  let user = null;
  let file = null;
  let files = null;

  switch (type) {
    case SET_DARKMODE:
      return {...state, darkMode: payload};
    case SWITCH_DARKMODE:
      darkMode = !state.darkMode;
      return {...state, darkMode};

    case LOGIN:
      user = {...state.user, ...payload};
      return {
        ...state,
        user,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };

    case SET_FILES:
      return {...state, files: payload};
    case UPDATE_FILES:
      files = [...state.files];
      file = files.find(f => f.id === payload.fileId);
      file.name = payload.name;
      file.updatedAt = payload.updatedAt;
      return {...state, files};
    case UPLOAD_FILE:
      files = [...state.files, payload];
      return {...state, files};
    case DELETE_FILE:
      files = state.files.filter(f => f.id !== payload);
      return {...state, files};

    case SET_ALL_FILES:
      return {...state, allFiles: payload};

    case SHOW_SNACKBAR_MESSAGE:
      return {...state, snackbarMessage: payload, snackbarOpened: true};

    case CLOSE_SNACKBAR:
      return {...state, snackbarOpened: false};

    default:
      return state;
  }
};

export default AppReducer;
