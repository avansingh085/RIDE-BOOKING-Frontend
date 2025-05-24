import apiClient from "../../../utils/apiClient";
export const createBike = (data) => apiClient.post('/bike', data);
export const getBike = (id) => apiClient.get(`/bike/${id}`);
export const getAllBikes = () => apiClient.get('/bike');
export const updateBike = (id, data) => apiClient.put(`/bike/${id}`, data);
export const deleteBike = (id) => apiClient.delete(`/bike/${id}`);