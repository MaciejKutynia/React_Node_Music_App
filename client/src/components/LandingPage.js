import React, { useState, useEffect } from 'react';

import mainImg from '../images/main_page.png';
import arrow from '../images/arrow.svg';

import { useDispatch } from 'react-redux';

const LandingPage = () => {
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [top, setTop] = useState(0);

  useEffect(() => {
    window.addEventListener('load', () => {
      setTimeout(() => {
        setLoad(true);
      }, 1000);
    });
  }, [load]);

  return (
    <div className='landing-page' style={{ top: `${top}%` }}>
      <div className={load ? 'help visible' : 'help'}>
        <span>
          Pomóż nam powiększać bibliotekę. Dodaj swoje ulubione piosenki.
        </span>
        <button
          className='btn'
          onClick={() => {
            dispatch({ type: 'TOGGLE_ADD_FORM', payload: true });
            setTop(100);
          }}>
          Dodaj
        </button>
      </div>
      <img src={mainImg} className='main-img' alt='landing page' />
      <div className='scroll'>
        <img src={arrow} onClick={() => setTop(100)} />
      </div>
    </div>
  );
};

export default LandingPage;
