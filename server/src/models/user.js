const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  fullname: { type: String },
  email: { type: String },
  password: { type: String },
  avatarPath: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png' },
  avatarPathId: { type: String, default: null },
  is_admin: { type: Boolean, default: false },
  love_songs: {
    type: [
      {
        songId: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
        type: { type: String, default: 'Bài hát yêu thích' },
        addedAt: { type: Date, default: Date.now },
      }
    ],
    default: []
  },
  playlists: {
    type: [
      {
        title: { type: String },
        description: { type: String, default: "Mô tả" },
        avatarPath: { type: String, default: 'https://res.cloudinary.com/dgxlg5mhl/image/upload/v1698718351/spotify_fake/Avatar/jqz23hptwstcbru3riw9' },
        avatarPathId: { type: String, default: null },
        type: { type: String, default: 'Danh sách phát' },
        addedAt: { type: Date, default: Date.now },
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
  albums: {
    type: [
      {
        albumId: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
        type: { type: String, default: 'Album' },
        addedAt: { type: Date, default: Date.now },
      }
    ],
    default: []
  }
})


module.exports = mongoose.model('User', User);
