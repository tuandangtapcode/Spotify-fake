const Song = require('../models/song');
const User = require('../models/user');
const Album = require('../models/album');
const cloudinary = require('cloudinary').v2;
const response = require('../utils/response-result');

class SongService {

  async fncCreateSong(req) {
    const { title, artist } = req.body;
    try {
      const song = await Song.findOne({ title });
      const user = await User.findOne({ _id: artist });
      if (song) {
        cloudinary.uploader.destroy(req.files.avatar[0].filename);
        cloudinary.uploader.destroy(req.files.audio[0].filename);
        return response({}, true, 'Bài hát đã tồn tại');
      };
      const create = await Song.create({
        ...req.body,
        artist: user._id,
        avatarPath: req.files.avatar[0].path,
        avatarPathId: req.files.avatar[0].filename,
        audioPath: req.files.audio[0].path,
        audioPathId: req.files.audio[0].filename,
      });
      return response(create, false, 'Thêm mới bài hát thành công');
    } catch (error) {
      cloudinary.uploader.destroy(req.files.avatar[0].filename);
      cloudinary.uploader.destroy(req.files.audio[0].filename);
      return response({}, true, error.toString());
    }
  }

  async fncGetOneSong(req) {
    const id = req.params.id;
    try {
      const song = await Song.findOne({ _id: id }).populate('artist', ['avatarPath', 'fullname']).populate('albumId', ['avatarPath', 'title']);
      return response(song, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, 'Bài hát không tồn tại');
    }
  }

  async fncGetAllSongByUser(req) {
    const userId = req.params.id;
    try {
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
      return response({ list: songs, total: songs.length }, false, 'lấy data thành công');
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
    const title = req.body;
    try {
      const checkExistSong = await Song.findOne({ _id: id });
      const checkExistTitle = await Song.findOne({ title });
      if (!checkExistSong) return response({}, true, 'Song không tồn tại');
      if (!!checkExistTitle && checkExistSong._id !== checkExistTitle._id) return response({}, true, 'Album đã tồn tại');
      if (!!checkExistSong) {
        cloudinary.uploader.destroy(checkExistSong.audioPathId);
        cloudinary.uploader.destroy(checkExistSong.avatarPathId);
      }
      await Song.findOneAndUpdate({ _id: id }, req.body);
      const update = await Song.findOne({ _id: id });
      return response(update, false, 'Cập nhật thành công');
    } catch (error) {
      cloudinary.uploader.destroy(checkExistSong.audioPathId);
      cloudinary.uploader.destroy(checkExistSong.avatarPathId);
      return response({}, true, error.toString());
    }
  }
}

module.exports = new SongService;
