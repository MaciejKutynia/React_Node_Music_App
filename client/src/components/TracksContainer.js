import React, { useEffect } from 'react';

import TrackItem from './TrackItem';

import { getTracks, setPlayer } from '../actions/music.js';

import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TracksContainer = ({ audioRef }) => {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.music.tracks);

  const songCounter = useSelector((state) => state.buttons.songCounter);

  const view = useSelector((state) => state.buttons.view);
  const fav = useSelector((state) => state.buttons.library);

  const searched = useSelector((state) => state.music.searched);

  const isPlaying = useSelector((state) => state.music.isPlayed);
  const fromLibrary = useSelector((state) => state.buttons.fromLibrary);

  useEffect(() => {
    dispatch(getTracks());
  }, [getTracks]);

  // useEffect(() => {
  //   if (songCounter && !fromLibrary) {
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

  return (
    <div className={view ? 'tracks-container list' : 'tracks-container'}>
      {searched
        ? searched.map((track, index) => (
            <TrackItem
              audioRef={audioRef}
              track={track}
              index={index}
              key={track._id}
            />
          ))
        : tracks &&
          tracks.map((track, index) => (
            <TrackItem
              audioRef={audioRef}
              track={track}
              index={index}
              key={track._id}
            />
          ))}
    </div>
  );
};

export default TracksContainer;
