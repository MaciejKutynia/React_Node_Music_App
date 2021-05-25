import axios from 'axios';
import { setAlert } from './alert';
const base_url = 'http://localhost:5000';

export const getTracks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${base_url}/`);
    dispatch({
      type: 'GET_TRACKS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR' });
  }
};

export const setPlayer = (id, artist, title, cover) => async (dispatch) => {
  try {
    dispatch({ type: 'IS_PLAYING', payload: false });
    const res = await axios.post(`${base_url}/track`, { id });
    dispatch({
      type: 'GET_SRC',
      payload: {
        src: res.data.src,
        artist,
        title,
        cover,
      },
    });
  } catch (error) {
    dispatch({ type: 'ERROR' });
  }
};

export const searchTracks = (query) => async (dispatch) => {
  try {
    const res = await axios.get(`${base_url}/search/${query}`);
    dispatch({
      type: 'SEARCHED_TRACKS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR' });
  }
};

export const fetchNewFile = (file) => async (dispatch) => {
  const res = await axios.post(`${base_url}/new`, { file });
  dispatch(setAlert(res));
};

export const fetchEditTrack = (file) => async (dispatch) => {
  const res = await axios.post(`${base_url}/edit`, { file });
  dispatch(setAlert(res));
};
