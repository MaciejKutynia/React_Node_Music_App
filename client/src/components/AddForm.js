import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { readFile } from '../utils/readFile';
import { getTracks } from '../actions/music';

import { fetchNewFile, fetchEditTrack } from '../actions/music';
import { setAlert } from '../actions/alert';

const AddForm = () => {
  const dispatch = useDispatch();

  const regex = /[./[]/g;

  const [audioName, setAudioName] = useState('Załącz plik lub upuść tutaj');
  const [artist, setArtist] = useState('');
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [imageName, setImageName] = useState('Załącz plik lub upuść tutaj');
  const [checkField, setCheckField] = useState(false);
  const [audioFiles, setAudioFiles] = useState(null);
  const [imageFiles, setImageFiles] = useState(null);

  const addForm = useSelector((state) => state.buttons.addForm);
  const edit = useSelector((state) => state.buttons.edit);
  const editedTrack = useSelector((state) => state.edit);

  useEffect(() => {
    if (edit) {
      setCheckField(true);
      setArtist(editedTrack.artist);
      setTitle(editedTrack.title);
      setCover(editedTrack.cover);
    } else {
      setCheckField(false);
      setArtist('');
      setTitle('');
      setCover('');
    }
  }, [edit, editedTrack]);

  const audioFileHandler = (event) => {
    if (event.target.files !== 0) {
      setAudioName(event.target.files[0].name);
      setAudioFiles(event.target.files[0]);
      return;
    }
    setAudioName('Załącz plik lub upuść tutaj');
  };

  const imageFileHandler = (event) => {
    if (event.target.files !== 0) {
      setImageName(event.target.files[0].name);
      setImageFiles(event.target.files[0]);
      return;
    }
    setImageName('Załącz plik lub upuść tutaj');
  };

  const checkHandler = (event) => {
    setCheckField(event.target.checked);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!edit) {
      if (audioFiles) {
        let src = await readFile(audioFiles);
        let imgSrc;

        if (checkField) {
          cover
            ? (imgSrc = cover)
            : (imgSrc = process.env.REACT_APP_DEFAULT_IMAGE);
        } else {
          imageFiles
            ? (imgSrc = await readFile(imageFiles))
            : (imgSrc = process.env.REACT_APP_DEFAULT_IMAGE);
        }

        if (artist === '' || title === '') {
          let name = audioFiles.name.split(regex)[0];
          name = name.split('-');
          setArtist(name[0]);
          setTitle(name[1]);
        }

        const file = {
          src,
          artist,
          title,
          cover: imgSrc,
        };

        await dispatch(fetchNewFile(file));
        await dispatch({
          type: 'IS_LOADING',
        });
        await dispatch(getTracks());
        setCover('');
        setTitle('');
        setArtist('');
        setAudioFiles(null);
        setImageFiles(null);
        setImageName('Załącz plik lub upuść tutaj');
        setAudioName('Załącz plik lub upuść tutaj');
        return;
      }
      dispatch(
        setAlert({
          data: 'Plik MP3 jest wymagany',
        })
      );
      return;
    }

    let imgSrc;
    if (checkField) {
      cover ? (imgSrc = cover) : (imgSrc = process.env.REACT_APP_DEFAULT_IMAGE);
    } else {
      imageFiles
        ? (imgSrc = await readFile(imageFiles))
        : (imgSrc = process.env.REACT_APP_DEFAULT_IMAGE);
    }

    let file = {
      artist,
      name: title,
      cover: imgSrc,
      id: editedTrack.id,
    };

    await dispatch(fetchEditTrack(file));
    await dispatch({
      type: 'IS_LOADING',
    });
    await dispatch(getTracks());
    setCover('');
    setTitle('');
    setArtist('');
    setAudioFiles(null);
    setImageFiles(null);
    setImageName('Załącz plik lub upuść tutaj');
  };

  return (
    <form
      className={addForm ? 'upload-form visible' : 'upload-form'}
      encType='multipart/form-data'>
      <div
        className='close'
        onClick={() => dispatch({ type: 'TOGGLE_ADD_FORM', payload: false })}>
        &times;
      </div>
      <div
        className='input-wrapper'
        style={edit ? { display: 'none' } : { display: 'flex' }}>
        <small>Plik MP3*</small>
        <label className='upload-file'>
          <p>{audioName}</p>
          <input type='file' accept='.mp3' onChange={audioFileHandler} />
        </label>
      </div>
      <div className='input-wrapper text-input'>
        <small>Artysta</small>
        <input
          type='text'
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
        />
      </div>
      <div className='input-wrapper text-input'>
        <small>Tytuł</small>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div
        className={checkField ? 'input-wrapper text-input' : 'input-wrapper'}>
        <div>
          <small>Okładka</small>
          <small>Zaznacz aby podać link do obrazka</small>
          <input type='checkbox' onChange={checkHandler} checked={checkField} />
        </div>
        <input
          type='text'
          style={checkField ? { display: 'inline-block' } : { display: 'none' }}
          onChange={(e) => setCover(e.target.value)}
          value={cover}
        />
        <label
          className='upload-file'
          style={checkField ? { display: 'none' } : { display: 'flex' }}>
          <p>{imageName}</p>
          <input type='file' accept='image/*' onChange={imageFileHandler} />
        </label>
      </div>
      <button className='btn submit' type='submit' onClick={submitHandler}>
        Prześlij
      </button>
    </form>
  );
};

export default AddForm;
