import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

const LibraryContainer = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => state.buttons.library);
  const view = useSelector((state) => state.buttons.view);

  return (
    <div
      className={
        state
          ? view
            ? 'library-container active list'
            : 'library-container active'
          : 'library-container'
      }></div>
  );
};

export default LibraryContainer;
