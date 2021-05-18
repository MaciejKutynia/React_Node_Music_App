const initialState = {
  player: true,
  library: false,
  isLoop: false,
  songCounter: 0,
  libraryCounter: 0,
  view: false,
};

export const buttonsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_PLAYER':
      return {
        ...state,
        player: false,
      };
    case 'LIBRARY_BUTTON':
      return {
        ...state,
        library: payload,
      };
    case 'IS_LOOP':
      return {
        ...state,
        isLoop: payload,
      };
    case 'SONG_COUNT':
      return {
        ...state,
        songCounter: payload,
      };
    case 'SET_VIEW':
      return {
        ...state,
        view: payload,
      };
    default:
      return { ...state };
  }
};
