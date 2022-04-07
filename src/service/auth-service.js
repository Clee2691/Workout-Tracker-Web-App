import axios from 'axios';
//const TUITS_API = 'http://localhost:4000/api';
const API_BASE = process.env.REACT_APP_API_BASE;
const AUTH_API = `${API_BASE}/auth`;

const api = axios.create({
    withCredentials: true
})

// Signing up
export const signup = async (user) => {
    const response = await api.post(`${AUTH_API}/signup`, user);
    return response.data;
}

export const login = async (credentials) => {
    const response = await api.post(`${AUTH_API}/login`, credentials);
    return response.data;
}

export const logout = async () => {
    const response = await api.post(`${AUTH_API}/logout`);
    return response.data;
}

export const profile = async (abortCont) => {
    const response = await api.post(`${AUTH_API}/profile`, {
      signal: abortCont.signal});
    return response.data;
}