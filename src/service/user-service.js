import axios from 'axios';
//const TUITS_API = 'http://localhost:4000/api';
const API_BASE = process.env.REACT_APP_API_BASE;
const USER_API = `${API_BASE}/users`;

const api = axios.create({
    withCredentials: true
})

export const findAllUsers = async () => {
    const response = await api.get(`${USER_API}`);
    return response.data;
}

export const updateUser = async (newUser) => {
    const response = await api.put(`${USER_API}/${newUser._id}`, newUser);
    return response.data;
}

export const findUserById = async (uid) => {
  const response = await api.get(`${USER_API}/userId/${uid}`);
  return response.data;
};