import mongoose from 'mongoose';

const { Schema } = mongoose;

const TrackSchema = new Schema({
  artist: String,
  name: String,
  cover: String,
  src: String,
  type: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('track', TrackSchema);
