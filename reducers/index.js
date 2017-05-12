import { combineReducers } from 'redux';
import settings from './settings';
import dialog from './dialog';

const rootReducer = combineReducers({
  settings,
  dialog
});

export default rootReducer;
