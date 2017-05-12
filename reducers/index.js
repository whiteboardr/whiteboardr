import { combineReducers } from 'redux';
import settings from './settings';
import dialog from './dialog';
import images from './images';

const rootReducer = combineReducers({
  settings,
  images,
  dialog
});

export default rootReducer;
