const Album = require('../models/album');
const User = require('../models/user');
const responseResult = require('../utils/response-result');
const cloudinary = require('cloudinary').v2;

class AlbumService {

  async fncCreateAlbum(req) {
    const { title, artist } = req.body;
    try {
      const user = await User.findOne({ _id: artist });
      const album = await Album.findOne({ title });
      if (album) {
        cloudinary.uploader.destroy(req.file.filename);
        return responseResult({}, true, 'Album đã tồn tại');
      }
      const create = await Album.create({ ...req.body, avatarPath: req.file.path, avatarPathId: req.file.filename });
      return responseResult(create, false, 'Tạo mới album thành công');
    } catch (error) {
      cloudinary.uploader.destroy(req.file.filename);
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncGetOneAlbum(req) {
    const id = req.params.id;
    try {
      const album = await Album.findOne({ _id: id });
      return responseResult(album, false, 'Lấy dữ liệu thành công');
    } catch (error) {
      return responseResult({}, true, 'Album không tồn tại');
    }
  }

  async fncGetAllAlbumByUser(req) {
    const userId = req.params.id;
    try {
      const user = await User.findOne({ _id: userId });
      const albums = await Album.find({ artist: userId });
      return responseResult(albums, false, 'Lấy dữ liệu thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncUpdateAlbum(req) {
    const id = req.params.id;
    try {
      const album = await Album.findOne({ _id: id });
      const update = await Album.updateOne({ _id: id }, req.body);
      return responseResult(update, false, 'Cập nhật thành công');
    } catch (error) {
      return responseResult({}, true, 'Album không tồn tại');
    }
  }

  async fncDeleteAlbum(req) {
    const id = req.params.id;
    let album = {}
    try {
      album = await Album.findOne({ _id: id });
      cloudinary.uploader.destroy(album.avatarPathId);
      const deleteAlbum = await Album.deleteOne({ _id: id });
      return responseResult(deleteAlbum, false, 'Xóa album thành công');
    } catch (error) {
      return responseResult({}, true, 'Album không tồn tại');
    }
  }

}

module.exports = new AlbumService;
