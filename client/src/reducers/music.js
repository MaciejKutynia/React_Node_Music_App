const initialState = {
  tracks: null,
  error: {},
  track: '',
  isLoading: true,
  searched: null,
  favourites: null,
  isPlayed: false,
};

export const musicReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_TRACKS':
      return {
        ...state,
        tracks: payload,
        isLoading: false,
      };
    case 'GET_SRC':
      return {
        ...state,
        track: payload.src,
        artist: payload.artist,
        title: payload.title,
        cover: payload.cover,
        isPlayed: true,
      };
    case 'ERROR':
      return {
        ...state,
        error: payload,
      };
    case 'SEARCHED_TRACKS':
      return {
        ...state,
        searched: payload,
        isLoading: false,
      };

    case 'IS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'IS_PLAYING':
      return { ...state, isPlayed: payload };
    case 'GET_FAV':
      return { ...state, favourites: payload };
    default:
      return state;
  }
};
