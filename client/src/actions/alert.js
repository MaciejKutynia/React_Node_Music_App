export const setAlert =
  (data, time = 3000) =>
  async (dispatch) => {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        msg: data.data,
        time,
        status: data.status,
      },
    });
    dispatch({
      type: 'TOGGLE_ADD_FORM',
      payload: false,
    });
  };
