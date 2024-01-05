import http from '../index';
import {
  apiAddOrDeleteAlbum,
  apiAddOrDeleteSong,
  apiChangePassword,
  apiCreatePlaylist,
  apiDeletePlaylist,
  apiForgotPassword,
  apiGetAllUser,
  apiGetOnePlaylist,
  apiGetProfileUser,
  apiGetUserByEmail,
  apiLogin,
  apiRegister,
  apiUpdate,
  apiUpdateInforPlaylist
} from './url';

export const register = (body) => http.post(apiRegister, body);
export const login = (body) => http.post(apiLogin, body);
export const getAllUser = (body) => http.post(apiGetAllUser, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const getUserByEmail = (body) => http.post(apiGetUserByEmail, body);
export const getProfileUser = (id) => http.get(`${apiGetProfileUser}/${id}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const updateProfile = (id, body) => http.put(`${apiUpdate}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
});
export const changePassword = (id, body) => http.post(`${apiChangePassword}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const forgotPassword = (id, body) => http.post(`${apiForgotPassword}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const addOrDeleteSong = (id, body) => http.post(`${apiAddOrDeleteSong}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const addOrDeleteAlbum = (id, body) => http.post(`${apiAddOrDeleteAlbum}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const createPlaylist = (id) => http.get(`${apiCreatePlaylist}/${id}`, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const getOnePlaylist = (id, body) => http.post(`${apiGetOnePlaylist}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const deletePlaylist = (id, body) => http.post(`${apiDeletePlaylist}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`
  }
});
export const updatePlaylist = (id, body) => http.post(`${apiUpdateInforPlaylist}/${id}`, body, {
  headers: {
    'token': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'multipart/form-data'
  }
});