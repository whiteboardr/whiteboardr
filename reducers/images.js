import {
  RECEIVE_IMAGES
} from '../actions';

const initialState = {
};

const images = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_IMAGES:
      return {
        ...state,
        ...action.images
      };
    default:
      return state;
  }
};

export default images;
