import React from 'react';

import { useSelector } from 'react-redux';

const Layer = () => {
  const addForm = useSelector((state) => state.buttons.addForm);
  const isAlert = useSelector((state) => state.alert.isAlert);
  const editForm = useSelector((state) => state.buttons.editForm);

  return (
    <div
      className={
        addForm || isAlert || editForm ? 'layer active' : 'layer'
      }></div>
  );
};

export default Layer;
