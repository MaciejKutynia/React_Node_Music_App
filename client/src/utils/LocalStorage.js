export const saveToLocal = (track) => {
  let playlist = getLocal();
  playlist.push(track[0]);
  localStorage.setItem('playlist', JSON.stringify(playlist));
};

export const deleteFromLocal = (track) => {
  const id = track[0]._id;
  let playlist = getLocal();
  playlist = playlist.filter((song) => song._id !== id);
  localStorage.setItem('playlist', JSON.stringify(playlist));
};

export const getLocal = () => {
  let playlist;
  if (localStorage.getItem('playlist') === null) {
    playlist = [];
  } else {
    playlist = JSON.parse(localStorage.getItem('playlist'));
  }
  return playlist;
};
