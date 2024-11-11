import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return { token: response.data.token, username }; // Include username in response
};

export const getTodos = async () => {
  const response = await api.get('/todos');
  return response.data;
};

export const createTodo = async (title: string) => {
  const response = await api.post('/todos', { title, completed: false });
  return response.data;
};

export const updateTodo = async (
  id: number,
  title: string,
  completed: boolean
) => {
  const response = await api.put(`/todos/${id}`, { title, completed });
  return response.data;
};

export const deleteTodo = async (id: number) => {
  await api.delete(`/todos/${id}`);
};
