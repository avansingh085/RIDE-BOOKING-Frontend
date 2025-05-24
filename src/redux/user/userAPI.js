import axios from 'axios';
import apiClient from '../../../utils/apiClient';
export const getUser = () => apiClient.get(`/user`);
export const updateUser = (data) =>{apiClient.put(`/user`, data);
   
};
export const deleteUser = () => apiClient.delete(`/user`);
