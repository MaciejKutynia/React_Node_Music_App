const initialState = {
  msg: '',
  time: 0,
  isAlert: false,
  status: null,
};

export const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALERT':
      return {
        ...state,
        msg: payload.msg,
        time: payload.time,
        status: payload.status,
        isAlert: true,
      };
    case 'CLEAR_ALERT':
      return {
        ...state,
        isAlert: false,
        msg: '',
        time: 0,
        status: null,
      };
    default:
      return { ...state };
  }
};
