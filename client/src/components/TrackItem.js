import React, { useState } from 'react';

import { setPlayer } from '../actions/music';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faPencilAlt,
  faHeart as fullHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';

import { useDispatch, useSelector } from 'react-redux';
import ToggleHeart from './ToggleHeart';

const TrackItem = ({ track, index, audioRef }) => {
  const dispatch = useDispatch();

  const addForm = useSelector((state) => state.buttons.addForm);
  const edit = useSelector((state) => state.buttons.edit);
  let favourites = useSelector((state) => state.buttons.fav);

  const id = track._id;

  const startPlayerHandler = (track, index, event) => {
    dispatch({ type: 'SONG_FROM_LIBRARY', payload: false });
    if (
      !event.target.classList.contains('fa-pencil-alt') &&
      !event.target.classList.contains('fa-heart')
    ) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      dispatch({ type: 'SET_PLAYER' });
      dispatch(setPlayer(track._id, track.artist, track.name, track.cover));
      dispatch({
        type: 'GET_TIME',
        payload: {
          currentTime: 0,
          duration: 0,
          percentage: 0,
        },
      });
      dispatch({ type: 'SONG_COUNT', payload: index });
    }
  };

  const addToLibraryHandler = () => {
    dispatch({
      type: 'FAVOURITES',
      payload: !favourites,
    });
  };

  const editTrackHandler = (track) => {
    dispatch({
      type: 'EDIT_TRACK',
      payload: true,
    });
    dispatch({
      type: 'TOGGLE_ADD_FORM',
      payload: true,
    });
    dispatch({
      type: 'SET_EDITED_DATA',
      payload: {
        artist: track.artist,
        title: track.name,
        cover: track.cover,
        id: track._id,
      },
    });
  };

  return (
    <div
      className='track-item'
      id={track._id}
      key={track._id}
      onClick={(event) => startPlayerHandler(track, index, event)}>
      <ToggleHeart id={track._id} />
      <FontAwesomeIcon
        icon={faPencilAlt}
        size='2x'
        onClick={() => editTrackHandler(track)}
      />
      <img src={track.cover} alt={`${track.artist} ${track.name}`} />
      <div className='track-info'>
        <h4>{track.artist}</h4>
        <span>-</span>
        <p>{track.name}</p>
      </div>
    </div>
  );
};

export default TrackItem;
