const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
  title: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // time: { type: Date, default: Date.now() },
  avatarPath: { type: String, default: null },
  avatarPathId: { type: String, default: null },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  like: { type: Number, default: 0 },
})


module.exports = mongoose.model('Album', Album);
