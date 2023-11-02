const SongService = require('../services/song.services');

class SongController {

  async createSong(req, res) {
    const response = await SongService.fncCreateSong(req);
    return res.json(response);
  }

  async getOneSong(req, res) {
    const response = await SongService.fncGetOneSong(req);
    return res.json(response);
  }

  async getAllSongByUser(req, res) {
    const response = await SongService.fncGetAllSongByUser(req);
    return res.json(response);
  }

  async getAllSongByAlbum(req, res) {
    const response = await SongService.fncGetAllSongByAlbum(req);
    return res.json(response);
  }

  async deleteSong(req, res) {
    const response = await SongService.fncDeleteSong(req);
    return res.json(response);
  }

  async deleteSongFromAlbum(req, res) {
    const response = await SongService.fncDeleteSong(req);
    return res.json(response);
  }

  async updateSong(req, res) {
    const response = await SongService.fncUpdateSong(req);
    return res.json(response);
  }

}

module.exports = new SongController;
