const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/getAllUser', UserController.getAllUser); //admin
router.put('/update/:id', UserController.updateUser);
router.post('/changePassword/:id', UserController.changePassword);
router.post('/forgotPassword/:id', UserController.forgotPassword);
router.post('/addOrDeleteSong/:id', UserController.addOrDeleteLoveSong);
router.post('/createPlaylist/:id', UserController.createPlaylist);
router.post('/getOnePlaylist/:id', UserController.getOnePlaylist);
router.post('/deletePlaylist/:id', UserController.deletePlaylist);
router.post('/updateInforPlaylist/:id', UserController.updateInforPlaylist);

module.exports = router;
