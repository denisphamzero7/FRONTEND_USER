import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1/', 
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getUsers = (params?:any) => api.get('/users',{params});
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post('/users', data);
export const updateAUser = (id: string, data: any) => api.patch(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const getCompanies = () => api.get('/companies')
export const getRoles = ()=> api.get('/roles')
export default api;
