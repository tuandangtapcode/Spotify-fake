const User = require('../models/user');
const Song = require('../models/song');
const sendMail = require('../utils/send-mail');
const randomCode = require('../utils/random-code');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { accessToken } = require('../utils/jwt');
const cloudinary = require('cloudinary').v2;
const responseResult = require('../utils/response-result');

class UserService {

  // About account

  async fncRegister(req, res) {
    const { email } = req.body;
    let code = 0;
    try {
      const checkEmailExists = await User.findOne({ email });
      if (checkEmailExists) return responseResult({}, true, 'Email đã tồn tại');
      const codeCheck = req.body.code;
      const codeCheckRandom = req.cookies.ccrd;
      if (!codeCheck) {
        code = randomCode();
        res.cookie('ccrd', bcrypt.hashSync(code.toString(), saltRounds), { maxAge: 36000000 });
        const subject = "Thông tin đăng ký tài khoản Spotify fake";
        const content = `
                <html>
                <head>  
                <style>
                    p {
                        color: #333;
                    }
                    span {
                        font-weight: 600;
                    }
                </style>
                </head>
                <body>
                    <h3>Chào mừng đến với Spotify fake</h3>
                    <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại ứng dụng của chúng tôi.</p>
                    <p>Hãy nhập mã xác thực sau để hoàn tất quá trình đăng ký: <span>${code}</span></p>
                </body>
                </html>`
        await sendMail(email, subject, content);
        return responseResult({}, false, 'Mã xác nhận đã được gửi về mail của bạn');
      } else {
        if (!bcrypt.compareSync(codeCheck, codeCheckRandom)) return;
        res.clearCookie('ccrd');
        const password = req.body.password;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        const hashUser = { ...req.body, password: hashPassword };
        const newUser = await User.create(hashUser);
        const subject = "Thông tin đăng ký tài khoản tại Spotify fake";
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
                        <h3>Chào mừng đến với Spotify fake</h3>
                        <p>Cảm ơn Anh/chị đã đăng ký tài khoản tại ứng dụng của chúng tôi.</p>
                        <p>Anh/chị vui lòng truy cập vào tài khoản theo địa chỉ <a href='http://localhost:3000'>Spotiy fake</a> để thực hiện đặt hàng và quản lý giao dịch nhanh chóng thuận tiện hơn.</p>
                        </body>
                    </html>`
        await sendMail(email, subject, content);
        return responseResult(newUser, false, 'Đăng ký tài khoản thành công');
      }
    } catch (error) {
      responseResult({}, true, error.toString());
    }

  }

  async fncLogin(req) {
    const { email, password } = req.body;
    try {
      const getUser = await User.findOne({ email });
      if (!getUser) return responseResult({}, true, 'Email không tồn tại');
      const check = bcrypt.compareSync(password, getUser.password);
      if (!check) return responseResult({}, true, 'Mật khẩu không chính xác');
      const access_token = accessToken({
        id: getUser._id,
        is_admin: getUser.is_admin,
      })
      return responseResult(access_token, false, 'Login thành công');
    } catch (error) {
      return responseResult({}, true, error.toString());
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
      return responseResult({ total, users }, false, 'Lấy data thành công');
    } catch (error) {
      return responseResult({}, true, error.toString());
    }
  }

  async fncUpdateUser(req) {
    const id = req.params.id;
    try {
      const getUser = await User.findOne({ _id: id });
      const update = await User.updateOne({ _id: id }, req.body);
      return responseResult(update, false, 'Cập nhật thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncChangePassword(req) {
    const id = req.params.id;
    const { oldpassword, newpassword } = req.body;
    try {
      const getUser = await User.findOne({ _id: id });
      const check = bcrypt.compareSync(oldpassword, getCustomer.password);
      if (!check) return responseResult({}, true, 'Mật khẩu không chính xác');;
      const hashPassword = bcrypt.hashSync(newpassword, saltRounds);
      const update = await User.updateOne({ _id: id }, { password: hashPassword });
      return responseResult(update, false, 'Cập nhật thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncForgotPassword(req) {
    const id = req.params.id;
    const { email, newpasswod } = req.body;
    try {
      const checkEmailExists = await User.findOne({ email });
      if (!checkEmailExists) return responseResult({}, true, 'Người dùng không tồn tại');
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
        return responseResult({}, false, 'Email xác nhận thay đổi mật khẩu đã được gửi về mail của bạn');
      } else {
        const hashPassword = bcrypt.hashSync(newpasswod, saltRounds);
        const update = await User.updateOne({ _id: id }, { password: hashPassword });
        return responseResult(update, false, 'Thay đổi mật khẩu thành công');;
      }
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  // About love songs

  async fncAddOrDeleteLoveSong(req) {
    const id = req.params.id;
    const songId = req.body.songId;
    try {
      const user = await User.findOne({ _id: id });
      if (user.love_songs.some(i => i === songId)) {
        const upateForUser = await User.updateOne({ _id: id }, { $pull: { love_songs: songId } });
        await Song.updateOne({ _id: songId }, { $inc: { like: -1 } });
        return responseResult(upateForUser, false, 'Bỏ like bài hát');
      } else {
        const update = await User.updateOne({ _id: id }, { $push: { love_songs: songId } });
        await Song.updateOne({ _id: songId }, { $inc: { like: 1 } });
        return responseResult(update, false, 'Like bài hát');;
      }
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  // About playlist

  async fncCreatePlaylist(req) {
    const id = req.params.id;
    const title = req.body.title;
    try {
      const user = await User.findOne({ _id: id });
      if (user.playlists.some(i => i.title === title)) return responseResult({}, true, 'Playlist đã tồn tại');
      const update = await User.updateOne({ _id: id }, { $push: { playlists: req.body } });
      return responseResult(update, false, 'Tạo mới playlist thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncGetOnePlaylist(req) {
    const id = req.params.id;
    const playlistId = req.body.playlistId;
    try {
      const user = await User.findOne({ _id: id });
      const playlist = user.playlists.find(i => i._id.equals(playlistId));
      if (!playlist) return responseResult({}, true, 'Playlist không tồn tại');
      return responseResult(playlist, false, 'Lấy data thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }

  async fncDeletePlaylist(req) {
    const id = req.params.id;
    const playlistId = req.body.playlistId;
    try {
      const update = await User.updateOne({ _id: id }, { $pull: { playlists: { _id: playlistId } } });
      return responseResult(update, false, 'Xóa playlist thành công');
    } catch (error) {
      return responseResult({}, true, 'Playlist không tồn tại');
    }
  }

  async fncUpdateInforPlaylist(req) {
    const id = req.params.id;
    const { playlistId, title, description } = req.body;
    try {
      const user = await User.findOne({ _id: id });
      if (user.playlists.some(i => i.title === title)) return responseResult({}, true, 'Playlist không tồn tại');;
      const update = await User.updateOne({ _id: id, 'playlists._id': playlistId }, {
        $set: {
          'playlists.$.title': title,
          'playlists.$.description': description
        }
      })
      return responseResult(update, false, 'Cập nhật playlist thành công');
    } catch (error) {
      return responseResult({}, true, 'Người dùng không tồn tại');
    }
  }


}

module.exports = new UserService;
