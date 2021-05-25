import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

const AlertPopup = () => {
  const dispatch = useDispatch();

  const time = useSelector((state) => state.alert.time);
  const msg = useSelector((state) => state.alert.msg);
  const status = useSelector((state) => state.alert.status);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT' });
    }, time);
  }, [time]);

  return (
    <div
      className={msg ? 'message visible' : 'message'}
      style={status === 500 ? { border: '0.15rem solid red' } : {}}>
      {msg}
    </div>
  );
};

export default AlertPopup;
