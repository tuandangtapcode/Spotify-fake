const User = require('../models/user');
const Song = require('../models/song');
const Album = require('../models/album')
const sendMail = require('../utils/send-mail');
const randomCode = require('../utils/random-code');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { accessToken } = require('../utils/jwt');
const cloudinary = require('cloudinary').v2;
const response = require('../utils/response-result');

class UserService {

  // About account

  async fncRegister(req) {
    try {
      const password = req.body.password;
      const hashPassword = bcrypt.hashSync(password, saltRounds);
      const hashUser = { ...req.body, password: hashPassword };
      const newUser = await User.create(hashUser);
      return response(newUser, false, 'Đăng ký tài khoản thành công');
    } catch (error) {
      response({}, true, error.toString());
    }
  }

  async fncLogin(req) {
    const { email, password } = req.body;
    try {
      const getUser = await User.findOne({ email });
      if (!getUser) return response({}, true, 'Email không tồn tại');
      const check = bcrypt.compareSync(password, getUser.password);
      if (!check) return response({}, true, 'Mật khẩu không chính xác');
      const access_token = accessToken({
        id: getUser._id,
        is_admin: getUser.is_admin,
      })
      return response(access_token, false, 'Login thành công');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  async fncGetAllUser(req) {
    const { page, keyword } = req.body;
    try {
      const total = await User.count();
      const users = await User.find({
        is_admin: false,
        fullname: { $regex: `${keyword}` }
      }).limit(parseInt(process.env.LIMIT)).skip(page * parseInt(process.env.LIMIT));
      return response({ total, users }, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  async fncGetUserByEmail(req) {
    const email = req.body.email;
    try {
      const getUser = await User.findOne({ email });
      if (getUser) return response({}, true, 'Địa chỉ này đã được liên kết với một tài khoản hiện có');
      return response({}, false, 'OK');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  async fncGetProfileUser(req) {
    const id = req.params.id;
    try {
      const user = await User.findOne({ _id: id });
      return response(user, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncUpdateUser(req) {
    const id = req.params.id;
    try {
      const getUser = await User.findOne({ _id: id });
      const update = await User.updateOne({ _id: id }, req.body);
      return response(update, false, 'Cập nhật thành công');
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncChangePassword(req) {
    const id = req.params.id;
    const { oldpassword, newpassword } = req.body;
    try {
      const getUser = await User.findOne({ _id: id });
      const check = bcrypt.compareSync(oldpassword, getCustomer.password);
      if (!check) return response({}, true, 'Mật khẩu không chính xác');;
      const hashPassword = bcrypt.hashSync(newpassword, saltRounds);
      const update = await User.updateOne({ _id: id }, { password: hashPassword });
      return response(update, false, 'Cập nhật thành công');
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncForgotPassword(req) {
    const id = req.params.id;
    const { email, newpasswod } = req.body;
    try {
      const checkEmailExists = await User.findOne({ email });
      if (!checkEmailExists) return response({}, true, 'Người dùng không tồn tại');
      if (!newpasswod) {
        res.cookie('usid', `${checkEmailExists.id}${randomCode()}`, { maxAge: 36000000 });
        const subject = "Thiết lập lại mật khẩu tài khoản khách hàng";
        const content = `
                <html>
                <head>
                <style>
                    p {
                        color: #333;
                    }
                </style>
                </head>
                <body>
                  <p>Xin chào ${checkEmailExists.fullname}</p>
                  <p>Anh/chị đã yêu cầu đổi mật khẩu tại Highlands Coffee CPG.</p>
                  <p> Anh/chị vui lòng truy cập vào liên kết dưới đây để thay đổi mật khẩu của Anh/chị nhé..</p>
                  <a href='http://localhost:3000/dat-lai-mat-khau'>Đặt lại mật khẩu</a>
                </body>
                </html>
                `
        await sendMail(email, subject, content);
        return response({}, false, 'Email xác nhận thay đổi mật khẩu đã được gửi về mail của bạn');
      } else {
        const hashPassword = bcrypt.hashSync(newpasswod, saltRounds);
        const update = await User.updateOne({ _id: id }, { password: hashPassword });
        return response(update, false, 'Thay đổi mật khẩu thành công');;
      }
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  // About love songs

  async fncAddOrDeleteLoveSong(req) {
    const id = req.params.id;
    const songId = req.body.songId;
    try {
      const user = await User.findOne({ _id: id });
      const lovesong = awaitUser.findOne({ 'love_songs.songId': songId });
      if (lovesong) {
        await User.updateOne({ _id: id }, { $pull: { love_songs: songId } });
        await Song.updateOne({ _id: songId }, { $inc: { like: -1 } });
        const userAfterUpdate = await User.findOne({ _id: id });
        return response(userAfterUpdate, false, 'Bỏ like bài hát');
      } else {
        await User.updateOne({ _id: id }, { $push: { love_songs: songId } });
        await Song.updateOne({ _id: songId }, { $inc: { like: 1 } });
        const userAfterUpdate = await User.findOne({ _id: id });
        return response(userAfterUpdate, false, 'Like bài hát');
      }
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  // About album

  async fncAddOrDeleteAlbum(req) {
    const id = req.params.id;
    const albumId = req.body.albumId;
    try {
      const user = await User.findOne({ _id: id });
      const album = await User.findOne({ 'albums.albumId': albumId });
      if (album) {
        console.log('album trong if', album);
        await User.updateOne({ _id: id }, { $pull: { albums: albumId } });
        await Album.updateOne({ _id: albumId }, { $inc: { like: -1 } });
        const userAfterUpdate = await User.findOne({ _id: id });
        return response(userAfterUpdate, false, 'Bỏ like album');
      } else {
        console.log('album trong else', album);
        await User.updateOne({ _id: id }, { $push: { albums: albumId } });
        await Album.updateOne({ _id: albumId }, { $inc: { like: 1 } });
        const userAfterUpdate = await User.findOne({ _id: id });
        return response(userAfterUpdate, false, 'Like album');
      }
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  // About playlist

  async fncCreatePlaylist(req) {
    const id = req.params.id;
    try {
      const userBefore = await User.findOne({ _id: id });
      const numericalOrder = !!userBefore.playlists.length ? userBefore.playlists.length + 1 : 1;
      await User.updateOne({ _id: id }, { $push: { playlists: { title: `Danh sách phát của tôi #${numericalOrder}` } } });
      const userAfter = await User.findOne({ _id: id });
      const newPlaylist = userAfter.playlists[userAfter.playlists.length - 1];
      return response(newPlaylist, false, 'Danh sách phát đã được thêm');
    } catch (error) {
      return response({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncGetOnePlaylist(req) {
    const id = req.params.id;
    const playlistId = req.body.playlistId;
    try {
      const user = await User.findOne({ _id: id });
      const playlist = user.playlists.find(i => i._id.equals(playlistId));
      if (!playlist) return response({}, true, 'Playlist không tồn tại');
      return response(playlist, false, 'Lấy data thành công');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

  async fncDeletePlaylist(req) {
    const id = req.params.id;
    const playlistId = req.body.playlistId;
    try {
      const update = await User.updateOne({ _id: id }, { $pull: { playlists: { _id: playlistId } } });
      return response(update, false, 'Xóa playlist thành công');
    } catch (error) {
      return response({}, true, 'Playlist không tồn tại');
    }
  }

  async fncUpdateInforPlaylist(req) {
    const id = req.params.id;
    const { playlistId, title, description } = req.body;
    try {
      const user = await User.findOne({ _id: id });
      const checkExistPlaylist = user.playlists.find(i => i._id.equals(playlistId));
      const checkExistTitle = user.playlists.find(i => i.title === title);
      if (!checkExistPlaylist) return response({}, true, 'Playlist không tồn tại');
      if (!!checkExistTitle && checkExistPlaylist._id !== checkExistTitle._id) return response({}, true, 'Playlist đã tồn tại');
      if (!!checkExistPlaylist) {
        cloudinary.uploader.destroy(checkExistPlaylist.avatarPathId);
      }
      await User.findOneAndUpdate({ _id: id, 'playlists._id': playlistId }, {
        $set: {
          'playlists.$.title': title,
          'playlists.$.description': description,
          'playlists.$.avatarPath': !!req.file ? req.file.path : checkExistPlaylist?.avatarPath,
          'playlists.$.avatarPathId': !!req.file ? req.file.filename : checkExistPlaylist?.avatarPathId,
        }
      })
      const userAfterUpdate = await User.findOne({ _id: id });
      return response(userAfterUpdate, false, 'Cập nhật playlist thành công');
    } catch (error) {
      return response({}, true, error.toString());
    }
  }


}

module.exports = new UserService;
