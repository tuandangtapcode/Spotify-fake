const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Song = new Schema({
  title: { type: String },
  lyrics: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', default: null },
  audioPath: { type: String },
  audioPathId: { type: String },
  avatarPath: { type: String },
  avatarPathId: { type: String },
  time: { type: Number, default: 0 },
  listener: { type: Number, default: 0 },
  like: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Song', Song);
