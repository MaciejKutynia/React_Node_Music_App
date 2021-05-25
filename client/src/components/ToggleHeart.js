import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import { deleteFromLocal, saveToLocal, getLocal } from '../utils/LocalStorage';

const ToggleHeart = ({ id }) => {
  const dispatch = useDispatch();
  const [favourites, setFavourites] = useState(false);
  const [playlist, setPlaylist] = useState([]);

  const tracks = useSelector((state) => state.music.tracks);
  const favs = useSelector((state) => state.music.favourites);

  useEffect(() => {
    setFavourites(false);
    favs.forEach((song) => song._id === id && setFavourites(true));
  }, [favs]);

  const favouritesHandler = async () => {
    setFavourites(!favourites);
    if (!favourites) {
      await saveToLocal(tracks.filter((song) => song._id === id));
      await dispatch({ type: 'GET_FAV', payload: getLocal() });
    } else {
      await deleteFromLocal(tracks.filter((song) => song._id === id));
      await dispatch({ type: 'GET_FAV', payload: getLocal() });
    }
  };

  return (
    <FontAwesomeIcon
      icon={favourites ? fullHeart : emptyHeart}
      size='2x'
      onClick={favouritesHandler}
    />
  );
};

export default ToggleHeart;
