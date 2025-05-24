import axios from 'axios';
import apiClient from '../../../utils/apiClient';
export const registerUser = (data) => apiClient.post('/auth/register', data);
export const loginUser = (data) => apiClient.post('/auth/login', data);
