const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/search.controllers');

router.post('/getResultSearch',
SearchController.getResultSearch
);
