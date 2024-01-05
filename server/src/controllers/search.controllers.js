const SearchService = require('../services/search.services')

class SearchController {

  async getResultSearch(req, res) {
    const response = await SearchService.fncGetResultSearch(req);
    return res.json(response);
  }

}

module.exports = new SearchController;
