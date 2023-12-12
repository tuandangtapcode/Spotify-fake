const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album.controllers');
const upload = require('../middlewares/clouddinary.middlewares');
const { authUsernMidleware } = require('../middlewares/auth.middlewares');

router.post('/create', authUsernMidleware, upload('Avatar').single('avatar'), AlbumController.createAlbum);
router.get('/getOneAlbum/:id', AlbumController.getOneAlbum);
router.get('/getAllAlbumByUser/:id', authUsernMidleware, AlbumController.getAllAlbumByUser);
router.post('/upateAlbum/:id', authUsernMidleware, upload('Avatar').single('avatar'), AlbumController.updateAlbum);
router.delete('/deleteAlbum/:id', authUsernMidleware, AlbumController.deleteAlbum);

module.exports = router;
