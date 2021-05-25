import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { getLocal, deleteFromLocal } from '../utils/LocalStorage';

import { setPlayer } from '../actions/music';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const LibraryContainer = ({ audioRef }) => {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.music.favourites);

  useEffect(() => {
    dispatch({ type: 'GET_FAV', payload: getLocal() });
  }, []);

  const state = useSelector((state) => state.buttons.library);
  const view = useSelector((state) => state.buttons.view);
  const songCounter = useSelector((state) => state.buttons.songCounter);
  const isPlaying = useSelector((state) => state.music.isPlayed);
  const fromLibrary = useSelector((state) => state.buttons.fromLibrary);

  // useEffect(() => {
  //   if (songCounter && fromLibrary) {
  //     dispatch(
  //       setPlayer(
  //         tracks[songCounter]._id,
  //         tracks[songCounter].artist,
  //         tracks[songCounter].name,
  //         tracks[songCounter].cover
  //       )
  //     );
  //   }
  // }, [songCounter, fromLibrary]);

  const startPlayerHandler = (track, index, event) => {
    dispatch({ type: 'SONG_FROM_LIBRARY', payload: true });
    if (
      !event.target.classList.contains('fa-pencil-alt') &&
      !event.target.classList.contains('fa-heart')
    ) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      dispatch({ type: 'SET_PLAYER' });
      dispatch(setPlayer(track._id, track.artist, track.title, track.cover));
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

  const removeFromLibHandler = async (id) => {
    await deleteFromLocal(tracks.filter((song) => song._id === id));
    await dispatch({ type: 'GET_FAV', payload: getLocal() });
  };

  return (
    <div
      className={
        state
          ? view
            ? 'library-container active list'
            : 'library-container active'
          : 'library-container'
      }>
      {tracks &&
        tracks.map((track, index) => (
          <div
            className='track-item'
            id={track._id}
            key={track._id}
            onClick={(event) => startPlayerHandler(track, index, event)}>
            <FontAwesomeIcon
              icon={faHeart}
              size='2x'
              onClick={() => removeFromLibHandler(track._id)}
            />
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
        ))}
    </div>
  );
};

export default LibraryContainer;
