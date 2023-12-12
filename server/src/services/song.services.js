const Song = require('../models/song');
const User = require('../models/user');
const Album = require('../models/album');
const cloudinary = require('cloudinary').v2;
const response = require('../utils/response-result');

class SongService {

  async fncCreateSong(req) {
    const { title, audioPathId, avatarPathId } = req.body;
    try {
      const song = await Song.findOne({ title });
      if (song) {
        cloudinary.uploader.destroy(audioPathId);
        cloudinary.uploader.destroy(avatarPathId);
        return response({}, true, 'Bài hát đã tồn tại');
      };
      const create = await Song.create(req.body);
      return response(create, false, 'Thêm mới bài hát thành công');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  async fncGetOneSong(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      return response(song, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncGetAllSongByUser(req) {
    const userId = req.params.id;
    try {
      const user = await User.findOne({ _id: userId });
      const songs = await Song.find({ artist: userId });
      return response(songs, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncGetAllSongByAlbum(req) {
    const albumId = req.params.id;
    try {
      const album = await Album.find({ _id: albumId });
      const songs = await Song.find({ albumId });
      return response(songs, false, 'lấy data thành công');
    } catch (error) {
      return response({}, true, 'Album không tồn tại');
    }
  }

  async fncDeleteSong(req) {
    const id = req.params.id;
    try {
      const deleteSong = await Song.deleteOne({ _id: id });
      return response(deleteSong, false, 'Xóa bài hát thành công');
    } catch (error) {
      return response({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncDeleteSongFromAlbum(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      const deleteFromAlbum = await Song.updateOne({ _id: id }, { albumId: null });
      return response(deleteFromAlbum, false, 'Xóa bài hát thành công');
    } catch (error) {
      return response({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncUpdateSong(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      const update = await Song.updateOne({ _id: id }, req.body);
      return response(update, false, 'Cập nhật bài hát thành công');
    } catch (error) {
      return response({}, true, 'Bài hát không tồn tại');
    }
  }

}

module.exports = new SongService;
