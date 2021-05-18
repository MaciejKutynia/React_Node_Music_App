import React, { useRef, useState } from 'react';

//Import styles
import './styles/app.scss';

//Import components
import TracksContainer from './components/TracksContainer';
import Player from './components/Player';
import Nav from './components/Nav';
import LibraryContainer from './components/LibraryContainer';

import { useDispatch, useSelector } from 'react-redux';
import { setPlayer } from './actions/music';
import Loading from './components/Loading';

function App() {
  const audioRef = useRef(null);

  const dispatch = useDispatch();

  const [percentage, setPercentage] = useState(0);

  const src = useSelector((state) => state.music.track);

  const loop = useSelector((state) => state.buttons.isLoop);

  const tracks = useSelector((state) => state.music.tracks);

  const songCounter = useSelector((state) => state.buttons.songCounter);

  const timeUpdateHandler = (event) => {
    const currentTime = event.target.currentTime,
      duration = event.target.duration;
    setPercentage(getPercentage(currentTime, duration));
    dispatch({
      type: 'GET_TIME',
      payload: {
        currentTime,
        duration,
        percentage,
      },
    });
  };

  const getPercentage = (time, duration) => {
    return Math.floor((time / duration) * 100);
  };

  const onEndedHandler = () => {
    if (loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
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
    <div className='App'>
      <Nav />
      <Loading />
      <div className='container'>
        <LibraryContainer audioRef={audioRef} />
        <TracksContainer audioRef={audioRef} />
      </div>
      <Player audioRef={audioRef} />
      <audio
        src={src}
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onEnded={onEndedHandler}></audio>
    </div>
  );
}

export default App;
