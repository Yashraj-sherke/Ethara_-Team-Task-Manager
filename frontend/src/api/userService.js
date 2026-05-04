import API from './axios';

export const getUsers = () => API.get('/users');
export const getDashboard = () => API.get('/dashboard');
