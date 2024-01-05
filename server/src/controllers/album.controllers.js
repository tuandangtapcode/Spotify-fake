const AlbumService = require('../services/album.services');

class AlbumController {

  async createAlbum(req, res) {
    const response = await AlbumService.fncCreateAlbum(req);
    return res.json(response);
  }

  async getOneAlbum(req, res) {
    const response = await AlbumService.fncGetOneAlbum(req);
    return res.json(response);
  }

  async getAllAlbumByUser(req, res) {
    const response = await AlbumService.fncGetAllAlbumByUser(req);
    return res.json(response);
  }

  async updateAlbum(req, res) {
    const response = await AlbumService.fncUpdateAlbum(req);
    return res.json(response);
  }

  async deleteAlbum(req, res) {
    const response = await AlbumService.fncDeleteAlbum(req);
    return res.json(response);
  }

}

module.exports = new AlbumController;
