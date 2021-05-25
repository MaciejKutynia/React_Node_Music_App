import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faImages,
  faList,
  faHeart,
  faPlus,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

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

  let addForm = useSelector((state) => state.buttons.addForm);

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
  };

  const showAddFormHandler = () => {};

  return (
    <header>
      <button className='btn fav' onClick={libraryHandler}>
        Ulubione
        <FontAwesomeIcon icon={faHeart} size='2x' />
      </button>
      <button
        className='btn add'
        onClick={() => {
          dispatch({
            type: 'TOGGLE_ADD_FORM',
            payload: true,
          });
          dispatch({
            type: 'EDIT_TRACK',
            payload: false,
          });
        }}>
        Dodaj
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <img
        className='logo'
        src={headphones}
        alt='musicapply'
        onClick={logoHandler}
      />

      <button className='btn list' onClick={viewHandler}>
        <FontAwesomeIcon icon={view ? faImages : faList} />{' '}
        {view ? 'Siatka' : 'Lista'}
      </button>
      <form className='search'>
        <input
          type='search'
          onChange={(event) => setQuery(event.target.value)}
        />
        <button onClick={searchHandler}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    </header>
  );
};

export default Nav;
