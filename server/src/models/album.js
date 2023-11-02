const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
  title: { type: String },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  year: { type: String },
  avatarPath: { type: String, default: null },
  avatarPathId: { type: String, default: null },
})


module.exports = mongoose.model('Album', Album);
