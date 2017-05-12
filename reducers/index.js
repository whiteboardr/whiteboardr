import { combineReducers } from 'redux';
import settings from './settings';
import dialog from './dialog';
import comments from './comments';

const rootReducer = combineReducers({
  settings,
  dialog,
  comments
});

export default rootReducer;
