import { RECEIVE_COMMENTS } from '../actions';

const initialState = {
  data: {},
  channel_id: 20170511120000
};

const comments = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default comments;
