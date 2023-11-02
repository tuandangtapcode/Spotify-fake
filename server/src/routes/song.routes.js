const express = require('express');
const router = express.Router();
const SongController = require('../controllers/song.controllers');

router.post('/create', SongController.createSong);
router.get('/getOneSong/:id', SongController.getOneSong);
router.get('/getAllSongByUser/:id', SongController.getAllSongByUser);
router.get('/getAllSongByAlbum/:id', SongController.getAllSongByAlbum);
router.delete('/deleteSong/:id', SongController.deleteSong);
router.get('/deleteSongFromAlbum/:id', SongController.deleteSongFromAlbum);
router.put('/updateSong/:id', SongController.updateSong);

module.exports = router;
