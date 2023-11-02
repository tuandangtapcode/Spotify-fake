const jwt = require('jsonwebtoken');

const authAdminMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(404);
    }
    const { payload } = decode;
    if (payload.is_admin) {
      next();
    } else {
      return res.status(404)
    }
  })
}

const authUsernMidleware = (req, res, next) => {
  const token = req.headers.token.split(' ')[1];
  const userid = req.params.id || req.body.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decode) {
    if (err) {
      return res.status(404);
    }
    const { payload } = decode;
    if (!payload.is_admin && payload._id == userid) {
      next();
    } else {
      return res.status(404);
    }
  })
}

module.exports = {
  authAdminMidleware,
  authUsernMidleware
}