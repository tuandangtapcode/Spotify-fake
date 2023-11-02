const UserService = require('../services/user.services')

class UserController {

  // About account

  async register(req, res) {
    const response = await UserService.fncRegister(req, res);
    return res.json(response);
  }

  async login(req, res) {
    const response = await UserService.fncLogin(req);
    return res.json(response);
  }

  async getAllUser(req, res) {
    const response = await UserService.fncGetAllUser(req);
    return res.json(response);
  }

  async updateUser(req, res) {
    const response = await UserService.fncUpdateUser(req);
    return res.json(response);
  }

  async changePassword(req, res) {
    const response = await UserService.fncChangePassword(req);
    return res.json(response);
  }

  async forgotPassword(req, res) {
    const response = await UserService.fncForgotPassword(req);
    return res.json(response);
  }

  // About love songs

  async addOrDeleteLoveSong(req, res) {
    const response = await UserService.fncAddOrDeleteLoveSong(req);
    return res.json(response);
  }

  // About playlist

  async createPlaylist(req, res) {
    const response = await UserService.fncCreatePlaylist(req);
    return res.json(response);
  }

  async getOnePlaylist(req, res) {
    const response = await UserService.fncGetOnePlaylist(req);
    return res.json(response);
  }

  async deletePlaylist(req, res) {
    const response = await UserService.fncDeletePlaylist(req);
    return res.json(response);
  }

  async updateInforPlaylist(req, res) {
    const response = await UserService.fncUpdateInforPlaylist(req);
    return res.json(response);
  }

}

module.exports = new UserController;
