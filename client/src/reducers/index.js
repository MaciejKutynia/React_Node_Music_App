import { combineReducers } from 'redux';
import { musicReducer } from './music';
import { buttonsReducer } from './buttons';
import { songReducer } from './song';

export default combineReducers({
  music: musicReducer,
  buttons: buttonsReducer,
  song: songReducer,
});
