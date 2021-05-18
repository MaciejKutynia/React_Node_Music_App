import express from 'express';
import Track from '../models/Track.js';

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

router.get('/track/:id', async (req, res) => {
  const id = req.params.id;
});

export default router;
