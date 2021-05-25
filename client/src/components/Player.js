import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepBackward,
  faStepForward,
  faVolumeUp,
  faVolumeMute,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';

import { useSelector, useDispatch } from 'react-redux';
import { setPlayer } from '../actions/music';

const Player = ({ audioRef }) => {
  const dispatch = useDispatch();

  const [volume, setVolume] = useState(1);
  const [time, setTime] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [volumeInputVisible, setVolumeInputVisible] = useState(false);

  const playerNone = useSelector((state) => state.buttons.player);
  const songCounter = useSelector((state) => state.buttons.songCounter);

  const currentTime = useSelector((state) => state.song.currentTime);
  const duration = useSelector((state) => state.song.duration);
  const percentage = useSelector((state) => state.song.percentage);

  const trackSrc = useSelector((state) => state.music.track);
  const artist = useSelector((state) => state.music.artist);
  const title = useSelector((state) => state.music.title);
  const cover = useSelector((state) => state.music.cover);

  const fromLibrary = useSelector((state) => state.buttons.fromLibrary);

  const favourites = useSelector((state) => state.music.favourites);

  const tracks = useSelector((state) => state.music.tracks);

  useEffect(() => {
    audioRef.current.play();
    setIsPlaying(true);
  }, [trackSrc]);

  const volumeHandler = (event) => {
    setVolume(event.target.value);
    setIsMute(false);
    audioRef.current.volume = volume;
  };

  const playSongHandler = () => {
    if (trackSrc) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = (event) => {
    audioRef.current.currentTime = event.target.value;
  };

  const toggleHandler = () => setToggle(!toggle);

  const volumeClickHandler = () => {
    setIsMute(!isMute);
    if (!isMute) {
      audioRef.current.volume = 0;
    } else {
      audioRef.current.volume = volume;
    }
  };

  const trackAnim = {
    left: `${-100 + percentage}%`,
  };

  const backwardHandler = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    if (fromLibrary) {
      if (songCounter > 0) {
        dispatch({
          type: 'SONG_COUNT',
          payload: songCounter - 1,
        });
      } else {
        dispatch({
          type: 'SONG_COUNT',
          payload: favourites.length - 1,
        });
      }
      dispatch(
        setPlayer(
          favourites[songCounter]._id,
          favourites[songCounter].artist,
          favourites[songCounter].name,
          favourites[songCounter].cover
        )
      );
    } else {
      if (songCounter > 0) {
        dispatch({
          type: 'SONG_COUNT',
          payload: songCounter - 1,
        });
      } else {
        dispatch({
          type: 'SONG_COUNT',
          payload: tracks.length - 1,
        });
      }
      dispatch(
        setPlayer(
          tracks[songCounter]._id,
          tracks[songCounter].artist,
          tracks[songCounter].name,
          tracks[songCounter].cover
        )
      );
    }
  };

  const forwardHandler = () => {
    setIsPlaying(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    if (fromLibrary) {
      if (songCounter < favourites.length - 1) {
        dispatch({
          type: 'SONG_COUNT',
          payload: songCounter + 1,
        });
      } else {
        dispatch({ type: 'SONG_COUNT', payload: 0 });
      }
      dispatch(
        setPlayer(
          favourites[songCounter]._id,
          favourites[songCounter].artist,
          favourites[songCounter].name,
          favourites[songCounter].cover
        )
      );
    } else {
      if (songCounter < tracks.length - 1) {
        dispatch({
          type: 'SONG_COUNT',
          payload: songCounter + 1,
        });
      } else {
        dispatch({ type: 'SONG_COUNT', payload: 0 });
      }
      dispatch(
        setPlayer(
          tracks[songCounter]._id,
          tracks[songCounter].artist,
          tracks[songCounter].name,
          tracks[songCounter].cover
        )
      );
    }
  };

  return (
    <div
      className={
        playerNone ? 'player none' : !toggle ? 'player' : 'player hidden'
      }>
      <div className='cover' onClick={toggleHandler}>
        <img src={cover} alt={title} />
      </div>
      <div className='track-info'>
        <h4>{artist}</h4>
        <p>{title}</p>
      </div>
      <div className='track-time'>
        <p id='current-time'>{currentTime ? getTime(currentTime) : '0:00'}</p>
        <div className='track'>
          <input
            type='range'
            id='track-time-input'
            value={currentTime || 0}
            max={duration || 0}
            min='0'
            onChange={dragHandler}
          />
          <div className='track-anim' style={trackAnim}></div>
        </div>
        <p id='end-time'>{duration ? getTime(duration) : '0:00'}</p>
      </div>
      <div className='controls'>
        <FontAwesomeIcon
          icon={faStepBackward}
          size='2x'
          className='icon'
          onClick={backwardHandler}
        />
        <div id='volume'>
          <FontAwesomeIcon
            icon={isMute ? faVolumeMute : faVolumeUp}
            size='2x'
            className={isMute ? 'icon mute' : 'icon'}
            onClick={volumeClickHandler}
            onMouseEnter={() => setVolumeInputVisible(true)}
            onMouseLeave={() => setVolumeInputVisible(false)}
          />
          <input
            type='range'
            min='0'
            max='1'
            value={volume}
            step='0.01'
            onChange={volumeHandler}
            onClick={volumeHandler}
            onMouseEnter={() => setVolumeInputVisible(true)}
            onMouseLeave={() => setVolumeInputVisible(false)}
            className={volumeInputVisible ? 'visible' : ''}
          />
        </div>
        <FontAwesomeIcon
          icon={isPlaying ? faPause : faPlay}
          size='2x'
          onClick={playSongHandler}
          className='icon'
        />
        <FontAwesomeIcon
          icon={faStepForward}
          size='2x'
          className='icon'
          onClick={forwardHandler}
        />

        <FontAwesomeIcon
          icon={faRedo}
          size='2x'
          className={isLoop ? 'icon loop' : 'icon'}
          onClick={() => {
            dispatch({
              type: 'IS_LOOP',
              payload: !isLoop,
            });
            setIsLoop(!isLoop);
          }}
        />
      </div>
    </div>
  );
};

export default Player;
