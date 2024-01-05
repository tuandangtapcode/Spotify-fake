const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album.controllers');
const upload = require('../middlewares/clouddinary.middlewares');
const { authUsernMidleware } = require('../middlewares/auth.middlewares');

router.post('/create',
  upload('Avatar').single('avatar'),
  authUsernMidleware,
  AlbumController.createAlbum
);
router.get('/getOneAlbum/:id',
  AlbumController.getOneAlbum
);
router.get('/getAllAlbumByUser/:id',
  authUsernMidleware,
  AlbumController.getAllAlbumByUser
);
router.post('/updateAlbum/:id',
  upload('Avatar').single('avatar'),
  authUsernMidleware,
  AlbumController.updateAlbum
);
router.delete('/deleteAlbum/:id',
  upload('Avatar').single('avatar'),
  authUsernMidleware,
  AlbumController.deleteAlbum
);

module.exports = router;
