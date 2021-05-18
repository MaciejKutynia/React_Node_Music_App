import React from 'react';

import loadingImg from '../images/loading.gif';

import { useSelector } from 'react-redux';

const Loading = () => {
  const isLoading = useSelector((state) => state.music.isLoading);

  return (
    <div className={isLoading ? 'loading visible' : 'loading'}>
      <img src={loadingImg} alt='loading' />
    </div>
  );
};

export default Loading;
