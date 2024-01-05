const express = require('express');
const router = express.Router();
const upload = require('../middlewares/clouddinary.middlewares');
const SongController = require('../controllers/song.controllers');
const { authUsernMidleware } = require('../middlewares/auth.middlewares');

router.post('/create',
  upload('MP3').fields([{ name: 'audio', maxCount: 1 }, { name: 'avatar', maxCount: 1 }]),
  authUsernMidleware,
  SongController.createSong
);
router.get('/getOneSong/:id',
  SongController.getOneSong
);
router.get('/getAllSongByUser/:id',
  authUsernMidleware,
  SongController.getAllSongByUser
);
router.get('/getAllSongByAlbum/:id',
  SongController.getAllSongByAlbum
);
router.delete('/deleteSong/:id',
  upload('MP3').single('audio'),
  authUsernMidleware,
  SongController.deleteSong
);
router.get('/deleteSongFromAlbum/:id',
  upload('MP3').single('audio'),
  authUsernMidleware,
  SongController.deleteSongFromAlbum
);
router.put('/updateSong/:id',
  upload('MP3').single('audio'),
  authUsernMidleware,
  SongController.updateSong
);

module.exports = router;
