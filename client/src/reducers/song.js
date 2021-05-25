const initialState = {
  currentTime: null,
  duration: null,
  percentage: null,
  newTrack: null,
};

export const songReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'GET_TIME':
      return {
        ...state,
        currentTime: payload.currentTime,
        duration: payload.duration,
        percentage: payload.percentage,
      };

    case 'NEW_TRACK':
      return {
        ...state,
        newTrack: payload,
      };
    default:
      return { ...state };
  }
};
