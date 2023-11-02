const Song = require('../models/song');
const User = require('../models/user');
const Album = require('../models/album');
const cloudinary = require('cloudinary').v2;
const responseResult = require('../utils/response-result');

class SongService {

  async fncCreateSong(req) {
    const { title, audioPathId, avatarPathId } = req.body;
    try {
      const song = await Song.findOne({ title });
      if (song) {
        cloudinary.uploader.destroy(audioPathId);
        cloudinary.uploader.destroy(avatarPathId);
        return responseResult({}, true, 'Bài hát đã tồn tại');
      };
      const create = await Song.create(req.body);
      return responseResult(create, false, 'Thêm mới bài hát thành công');
    } catch (error) {
      return responseResult({}, true, error.toString());
    }
  }

  async fncGetOneSong(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      return responseResult(song, false, 'Lấy data thành công');
    } catch (error) {
      return responseResult({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncGetAllSongByUser(req) {
    const userId = req.params.id;
    try {
      const user = await User.findOne({ _id: userId });
      const songs = await Song.find({ artist: userId });
      return responseResult(songs, false, 'Lấy data thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncGetAllSongByAlbum(req) {
    const albumId = req.params.id;
    try {
      const album = await Album.find({ _id: albumId });
      const songs = await Song.find({ albumId });
      return responseResult(songs, false, 'lấy data thành công');
    } catch (error) {
      return responseResult({}, true, 'Album không tồn tại');
    }
  }

  async fncDeleteSong(req) {
    const id = req.params.id;
    try {
      const deleteSong = await Song.deleteOne({ _id: id });
      return responseResult(deleteSong, false, 'Xóa bài hát thành công');
    } catch (error) {
      return responseResult({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncDeleteSongFromAlbum(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      const deleteFromAlbum = await Song.updateOne({ _id: id }, { albumId: null });
      return responseResult(deleteFromAlbum, false, 'Xóa bài hát thành công');
    } catch (error) {
      return responseResult({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncUpdateSong(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id });
      const update = await Song.updateOne({ _id: id }, req.body);
      return responseResult(update, false, 'Cập nhật bài hát thành công');
    } catch (error) {
      return responseResult({}, true, 'Bài hát không tồn tại');
    }
  }

}

module.exports = new SongService;
