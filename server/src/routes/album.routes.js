const express = require('express');
const router = express.Router();
const AlbumController = require('../controllers/album.controllers');
const upload = require('../middlewares/clouddinary.middlewares');

router.post('/create', upload('Avatar').single('avatar'), AlbumController.createAlbum);
router.get('/getOneAlbum/:id', AlbumController.getOneAlbum);
router.get('/getAllAlbumByUser/:id', AlbumController.getAllAlbumByUser);
router.post('/upateAlbum/:id', upload('Avatar').single('avatar'), AlbumController.updateAlbum);
router.delete('/deleteAlbum/:id', AlbumController.deleteAlbum);

module.exports = router;
