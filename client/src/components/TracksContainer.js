import React, { useEffect } from 'react';
import { getTracks, setPlayer } from '../actions/music.js';
import { useDispatch, useSelector } from 'react-redux';

const TracksContainer = ({ audioRef }) => {
  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.music.tracks);

  const songCounter = useSelector((state) => state.buttons.songCounter);

  const view = useSelector((state) => state.buttons.view);

  const searched = useSelector((state) => state.music.searched);

  useEffect(() => {
    dispatch(getTracks());
  }, [getTracks]);

  useEffect(() => {
    if (songCounter) {
      dispatch(
        setPlayer(
          tracks[songCounter]._id,
          tracks[songCounter].artist,
          tracks[songCounter].name,
          tracks[songCounter].cover
        )
      );
    }
  }, [songCounter]);

  const startPlayerHandler = (id, artist, title, cover, index) => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    dispatch({ type: 'SET_PLAYER' });
    dispatch(setPlayer(id, artist, title, cover));
    dispatch({
      type: 'GET_TIME',
      payload: {
        currentTime: 0,
        duration: 0,
        percentage: 0,
      },
    });
    dispatch({ type: 'SONG_COUNT', payload: index });
  };

  return (
    <div className={view ? 'tracks-container list' : 'tracks-container'}>
      {searched
        ? searched.map((track, index) => (
            <div
              className='track-item'
              id={track._id}
              key={track._id}
              onClick={() =>
                startPlayerHandler(
                  track._id,
                  track.artist,
                  track.name,
                  track.cover,
                  index
                )
              }>
              <img src={track.cover} alt='' />
              <div className='track-info'>
                <h4> {track.artist}</h4>
                <span>-</span>
                <p>{track.name}</p>
              </div>
            </div>
          ))
        : tracks.map((track, index) => (
            <div
              className='track-item'
              id={track._id}
              key={track._id}
              onClick={() =>
                startPlayerHandler(
                  track._id,
                  track.artist,
                  track.name,
                  track.cover,
                  index
                )
              }>
              <img src={track.cover} alt='' />
              <div className='track-info'>
                <h4> {track.artist}</h4>
                <span>-</span>
                <p>{track.name}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default TracksContainer;
