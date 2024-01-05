const jwt = require('jsonwebtoken');

const authAdminMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(403);
    }
    const { payload } = decode;
    if (payload.is_admin) {
      next();
    } else {
      return res.status(403)
    }
  })
}

const authUsernMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  const userid = req.body.artist || req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(403);
    }
    const { payload } = decode;
    if (!payload.is_admin && payload.id === userid) {
      next();
    } else {
      return res.status(403);
    }
  })
}

module.exports = {
  authAdminMidleware,
  authUsernMidleware
}