import axios from 'axios';
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
    const res = await axios.post('/track', { id });
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
    const res = await axios.get(`/search/${query}`);
    dispatch({
      type: 'SEARCHED_TRACKS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: 'ERROR' });
  }
};
