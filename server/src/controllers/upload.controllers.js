
class UploadController {

  async uploadAvatar(req, res) {
    if (!req.file) return res.json();
    return res.json({ path: req.file.path, filename: req.file.filename });
  }

  async uploadAudio(req, res) {
    if (!req.file) return res.json();
    return res.json({ path: req.file.path, filename: req.file.filename });
  }

}


module.exports = new UploadController;
