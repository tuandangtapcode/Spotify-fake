import http from '../index';
import {
  apiCreateAlbum,
  apiDeleteAlbum,
  apiGetOneAlbum,
  apiUpdateAlbum,
  apigetAllAlbumByUser
} from './url';

export const createAlbum = (body) => http.post(apiCreateAlbum, body, {
  headers: {
    'Content-Type': 'multipart/form-data',
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const getOneAlbum = (id) => http.get(`${apiGetOneAlbum}/${id}`);
export const getAllAlbumByUser = (id) => http.get(`${apigetAllAlbumByUser}/${id}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const updateAlbum = (id, body) => http.post(`${apiUpdateAlbum}/${id}`, body);
export const deleteAlbum = (id) => http.delete(`${apiDeleteAlbum}/${id}`);
