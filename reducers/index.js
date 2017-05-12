import { combineReducers } from 'redux';
import settings from './settings';
import dialog from './dialog';
import images from './images';
import comments from './comments';

const rootReducer = combineReducers({
  settings,
  images,
  comments,
  dialog
});

export default rootReducer;
