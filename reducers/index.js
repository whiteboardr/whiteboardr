import { combineReducers } from 'redux';
import settings from './settings';
import dialog from './dialog';
import images from './images';
import comments from './comments';
import channels from './channels';

const rootReducer = combineReducers({
  settings,
  images,
  comments,
  channels,
  dialog
});

export default rootReducer;
