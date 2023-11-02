# User
register: /user/register  ==> post
login: /user/login  ==> post
getAllUser: /user/getAllUser  ==> post
update: /user/update/:id  ==> put
changePassword: /user/changePassword/:id  ==> post
forgotPassword: /user/forgotPassword/:id  ==> post
addOrDeleteSong: /user/addOrDeleteSong/:id  ==> post
createPlaylist: /user/createPlaylist/:id  ==> post
getOnePlaylist: /user/getOnePlaylist/:id  ==> post
deletePlaylist: /user/deletePlaylist/:id  ==> post
updateInforPlaylist: /user/updateInforPlaylist/:id  ==> post

# Song
create: /song/create ==> post
getOneSong: /song/getOneSong/:id  ==> get
getAllSongByUser: /song/getAllSongByUser/:id  ==> get
getAllSongByAlbum: /song/getAllSongByAlbum/:id  ==> get
deleteSong: /song/deleteSong/:id  ==> delete
deleteSongFromAlbum: /song/deleteSongFromAlbum/:id  ==> get
updateSong: /song/updateSong/:id  => put

# Album
create: /album/create  ==> post
getOneAlbum: /album/getOneAlbum/:id  ==> get
getAllAlbumByUser: /album/getAllAlbumByUser/:id  ==> get
upateAlbum: /album/updateAlbum/:id  ==> post
deleteAlbum: /album/deleteAlbum/:id  ==> delete

# Upload
avatar: /upload/avatar
audio: /upload/audio