import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faImages, faList } from '@fortawesome/free-solid-svg-icons';

import headphones from '../images/headphones.png';

import { searchTracks, getTracks } from '../actions/music';

//Redux logic
import { useDispatch, useSelector } from 'react-redux';

const Nav = () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');

  let libraryState = useSelector((state) => state.buttons.library);

  //If view is True View change to the list otherwise is pictures view
  let view = useSelector((state) => state.buttons.view);

  const libraryHandler = () => {
    libraryState = !libraryState;
    dispatch({
      type: 'LIBRARY_BUTTON',
      payload: libraryState,
    });
  };

  const viewHandler = () => {
    view = !view;
    dispatch({ type: 'SET_VIEW', payload: view });
    console.log(view);
  };

  const logoHandler = () => {
    dispatch({
      type: 'SEARCHED_TRACKS',
      payload: null,
    });
    dispatch(getTracks());
  };

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: 'IS_LOADING',
    });
    event.target.parentElement.children[0].value = '';
    if (query !== '') {
      dispatch(searchTracks(query));
    } else {
      dispatch({
        type: 'SEARCHED_TRACKS',
        payload: null,
      });
    }
    setQuery('');
    console.log(query);
  };

  return (
    <header>
      <button className='btn' onClick={libraryHandler}>
        Ulubione
      </button>
      <form className='search'>
        <input
          type='search'
          onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={searchHandler}>Szukaj</button>
      </form>
      <img
        className='logo'
        src={headphones}
        alt='musicapply'
        onClick={logoHandler}
      />
      <button className='btn' onClick={viewHandler}>
        <FontAwesomeIcon icon={view ? faImages : faList} />{' '}
        {view ? 'Siatka' : 'Lista'}
      </button>
    </header>
  );
};

export default Nav;
