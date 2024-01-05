const Album = require("../models/album");
const Song = require('../models/song');
const response = require("../utils/response-result");


class SearchService {

  async fncGetResultSearch(req) {
    const keyword = req.body.keyword;
    try {
      const albums = await Album.find({
        title: { $regex: keyword, $options: 'i' }
      });
      const songs = await Song.find({
        title: { $regex: keyword, $options: 'i' }
      });
      return response({
        albums: albums,
        songs: songs
      }, false, 'Lấy data thành công')
    } catch (error) {
      return response({}, true, error.toString());
    }
  }

}

module.exports = new SearchService;
