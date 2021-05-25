import { combineReducers } from 'redux';
import { musicReducer } from './music';
import { buttonsReducer } from './buttons';
import { songReducer } from './song';
import { alertReducer } from './alert';
import { editReducer } from './edit';

export default combineReducers({
  music: musicReducer,
  buttons: buttonsReducer,
  song: songReducer,
  alert: alertReducer,
  edit: editReducer,
});
