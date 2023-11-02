const express = require('express');
const router = express.Router();
const UploadController = require('../controllers/upload.controllers');
const upload = require('../middlewares/clouddinary.middlewares');


router.post('/avatar', upload('Avatar').single('avatar'), UploadController.uploadAvatar);
router.post('/audio', upload('MP3').single('mp3'), UploadController.uploadAudio);

module.exports = router;
