import axios from 'axios';
import { apiCreateSong, apiDeleteSong, apiDeleteSongFromAlbum, apiGetAllSongByAlbum, apiGetAllSongByUser, apiGetOneSong, apiUpdateSong } from './url';

export const createSong = (body) => axios.post(apiCreateSong, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const getOneSong = (id) => axios.get(`${apiGetOneSong}/${id}`);
export const getAllSongByUser = (id) => axios.get(`${apiGetAllSongByUser}/${id}`);
export const getAllSongByAlbum = (id) => axios.get(`${apiGetAllSongByAlbum}/${id}`);
export const deleteSong = (id) => axios.delete(`${apiDeleteSong}/${id}`);
export const deleteSongFromAlbum = (id) => axios.get(`${apiDeleteSongFromAlbum}/${id}`);
export const updateSong = (id, body) => axios.put(`${apiUpdateSong}/${id}`, body);