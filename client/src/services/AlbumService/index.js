import axios from 'axios';
import { apiCreateAlbum, apiDeleteAlbum, apiGetOneAlbum, apiUpdateAlbum, apigetAllAlbumByUser } from './url';

export const createAlbum = (body) => axios.post(apiCreateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
export const getOneAlbum = (id) => axios.get(`${apiGetOneAlbum}/${id}`);
export const getAllAlbumByUser = (id) => axios.get(`${apigetAllAlbumByUser}/${id}`);
export const updateAlbum = (id, body) => axios.post(`${apiUpdateAlbum}/${id}`, body);
export const deleteAlbum = (id) => axios.delete(`${apiDeleteAlbum}/${id}`);
