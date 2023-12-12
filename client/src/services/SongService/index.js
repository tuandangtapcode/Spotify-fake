import http from '../index';
import {
  apiCreateSong,
  apiDeleteSong,
  apiDeleteSongFromAlbum,
  apiGetAllSongByAlbum,
  apiGetAllSongByUser,
  apiGetOneSong,
  apiUpdateSong
} from './url';

export const createSong = (body) => http.post(apiCreateSong, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const getOneSong = (id) => http.get(`${apiGetOneSong}/${id}`);
export const getAllSongByUser = (id) => http.get(`${apiGetAllSongByUser}/${id}`);
export const getAllSongByAlbum = (id) => http.get(`${apiGetAllSongByAlbum}/${id}`);
export const deleteSong = (id) => http.delete(`${apiDeleteSong}/${id}`);
export const deleteSongFromAlbum = (id) => http.get(`${apiDeleteSongFromAlbum}/${id}`);
export const updateSong = (id, body) => http.put(`${apiUpdateSong}/${id}`, body);