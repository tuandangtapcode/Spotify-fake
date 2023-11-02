const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  avatarPath: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' },
  avatarPathId: { type: String, default: null },
  is_admin: {
    type: Boolean,
    default: false
  },
  love_songs: {
    type: [
      {
        songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' }
      }
    ],
    default: []
  },
  playlists: {
    type: [
      {
        title: { type: String },
        description: { type: String, default: null },
        avatarPath: { type: String, default: null },
        avatarPathId: { type: String, default: null },
        songs: {
          type: [
            {
              songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' }
            }
          ],
          default: []
        }
      }
    ],
    default: []
  },
})


module.exports = mongoose.model('User', User);
