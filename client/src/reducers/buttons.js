const initialState = {
  player: true,
  library: false,
  isLoop: false,
  songCounter: 0,
  libraryCounter: 0,
  view: false,
  addForm: false,
  edit: false,
  fav: false,
  fromLibrary: false,
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
    case 'TOGGLE_ADD_FORM':
      return {
        ...state,
        addForm: payload,
      };
    case 'EDIT_TRACK':
      return {
        ...state,
        edit: payload,
      };
    case 'FAVOURITES':
      return {
        ...state,
        fav: payload,
      };
    case 'SONG_FROM_LIBRARY':
      return { ...state, fromLibrary: payload };
    default:
      return { ...state };
  }
};
