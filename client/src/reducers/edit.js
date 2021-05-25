const initialState = {
  artist: '',
  title: '',
  cover: '',
  id: '',
};

export const editReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_EDITED_DATA':
      return {
        ...state,
        artist: payload.artist,
        title: payload.title,
        cover: payload.cover,
        id: payload.id,
      };
    default:
      return { ...state };
  }
};
