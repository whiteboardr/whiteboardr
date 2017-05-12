import { RECEIVE_CHANNELS } from '../actions';

const initialState = {
  data: {}
};

const channels = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CHANNELS:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default channels;
