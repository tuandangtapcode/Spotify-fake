const UserRoutes = require('./user.routes');
const AlbumRoutes = require('./album.routes');
const SongRoutes = require('./song.routes');

function routes(app) {
  app.use('/user', UserRoutes);
  app.use('/album', AlbumRoutes);
  app.use('/song', SongRoutes);
}

module.exports = routes;
