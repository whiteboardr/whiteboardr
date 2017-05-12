import {
  LOGGING_IN,
  UPDATE_SETTINGS
} from '../actions';

const initialState = {
  logged_in: false,
  checking_login: false,
  firebase_user: {}
};

const settings = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        logging_in: action.logging_in
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

export default settings;
