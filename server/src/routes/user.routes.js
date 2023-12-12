const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers');
const { authUsernMidleware, authAdminMidleware } = require('../middlewares/auth.middlewares');
const upload = require('../middlewares/clouddinary.middlewares');

router.get('/getProfileUser/:id', authUsernMidleware, UserController.getProfileUser);
router.get('/createPlaylist/:id', authUsernMidleware, UserController.createPlaylist);
router.post('/register', UserController.register);
router.post('/getUserByEmail', UserController.getUserByEmail);
router.post('/login', UserController.login);
router.post('/getAllUser', authAdminMidleware, UserController.getAllUser); //admin
router.put('/update/:id', authUsernMidleware, UserController.updateUser);
router.post('/changePassword/:id', authUsernMidleware, UserController.changePassword);
router.post('/forgotPassword/:id', authUsernMidleware, UserController.forgotPassword);
router.post('/addOrDeleteSong/:id', authUsernMidleware, UserController.addOrDeleteLoveSong);
router.post('/addOrDeleteAlbum/:id', authUsernMidleware, UserController.addOrDeleteAlbum);
router.post('/getOnePlaylist/:id', authUsernMidleware, UserController.getOnePlaylist);
router.post('/deletePlaylist/:id', authUsernMidleware, UserController.deletePlaylist);
router.post('/updateInforPlaylist/:id', authUsernMidleware, upload('Avatar').single('avatar'), UserController.updateInforPlaylist);

module.exports = router;
