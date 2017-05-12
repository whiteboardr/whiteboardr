import {RECEIVE_COMMENTS} from '../actions';

const comments = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {...state, ...action.comments};
    default:
      return state;
  }
};

export default comments;
