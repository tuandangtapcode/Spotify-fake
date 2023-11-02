import axios from 'axios';
import { apiAddOrDeleteSong, apiChangePassword, apiCreatePlaylist, apiDeletePlaylist, apiForgotPassword, apiGetAllUser, apiGetOnePlaylist, apiLogin, apiRegister, apiUpdate, apiUpdateInforPlaylist } from './url';

export const register = (body) => axios.post(apiRegister, body);
export const login = (body) => axios.post(apiLogin, body);
export const getAllUser = (body) => axios.post(apiGetAllUser, body);
export const updateUser = (id, body) => axios.put(`${apiUpdate}/${id}`, body);
export const changePassword = (id, body) => axios.post(`${apiChangePassword}/${id}`, body);
export const forgotPassword = (id, body) => axios.post(`${apiForgotPassword}/${id}`, body);
export const addOrDeleteSong = (id, body) => axios.post(`${apiAddOrDeleteSong}/${id}`, body);
export const createPlaylist = (id, body) => axios.post(`${apiCreatePlaylist}/${id}`, body);
export const getOnePlaylist = (id, body) => axios.post(`${apiGetOnePlaylist}/${id}`, body);
export const deletePlaylist = (id, body) => axios.post(`${apiDeletePlaylist}/${id}`, body);
export const updateInforPlaylist = (id, body) => axios.post(`${apiUpdateInforPlaylist}/${id}`, body);