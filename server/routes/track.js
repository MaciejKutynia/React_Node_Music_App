import express from 'express';
import Track from '../models/Track.js';
<<<<<<< HEAD
import fs from 'fs';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let tracks = await Track.find().select('-src').sort({ date: -1 });
    tracks = tracks.slice(0, 30);
    res.json(tracks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Błąd serwera');
  }
});

router.post('/track', async (req, res) => {
  try {
    const { id } = req.body;
    const src = await Track.findById({ _id: id }).select('src').select('-_id');
    res.json(src);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Błąd serwera');
  }
});

router.get('/search/:query', async (req, res) => {
  const query = req.params.query;
  try {
    let tracks = await Track.find({
      $or: [
        { artist: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
      ],
    }).select('-src');
    res.json(tracks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Błąd serwera');
  }
});

router.post('/new', async (req, res) => {
  try {
    const { artist, title, src, cover } = req.body.file;
    const track = await new Track({
      artist,
      name: title,
      cover,
      src,
      type: 'song',
    });
    await track.save();
    res.json('Plik został zapisany pomyślnie');
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Błąd serwera');
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { name, cover, id, artist } = req.body.file;
    await Track.findByIdAndUpdate(
      { _id: id },
      { name: name, cover: cover, artist: artist }
    );
    res.json('Utwór został pomyślnie zmieniony');
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Błąd serwera');
  }
});

=======

const router = express.Router();

>>>>>>> server
export default router;
