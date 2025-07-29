import axios from "axios";

import type { LoginCredentials,RegisterCredentials } from '../types/auth'
const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const getUsers = (params?: any) => api.get("/users", { params });
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post("/users", data);
export const updateAUser = (id: string, data: any) =>
  api.patch(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);
export const getCompanies = () => api.get("/companies");
export const getRoles = () => api.get("/roles");

//auth

export const login = (credentials: LoginCredentials) =>
  api.post("/auth/login", credentials);
export const register = (credentials: RegisterCredentials ) =>
  api.post("/auth/register",credentials);
export default api;
