    import axios, { InternalAxiosRequestConfig } from 'axios';
import { config } from '@/config';
import { AuthResponse, Post, User } from '@/types/api.types';

const api = axios.create({
  baseURL: config.apiUrl,
  withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apiService = {
  auth: {
    login: async (data: { email: string; password: string }): Promise<AuthResponse> => 
      (await api.post('/auth/login', data)).data,
    register: async (data: { username: string; email: string; password: string }): Promise<AuthResponse> => 
      (await api.post('/auth/register', data)).data,
    getProfile: async (): Promise<User> => 
      (await api.get('/auth/me')).data,
  },
  posts: {
    getAll: async (): Promise<Post[]> => 
      (await api.get('/posts')).data,
    create: async (data: { title: string; content: string }): Promise<Post> => 
      (await api.post('/posts', data)).data,
  },
}; 