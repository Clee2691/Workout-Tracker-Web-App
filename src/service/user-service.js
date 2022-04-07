import axios from 'axios';
//const TUITS_API = 'http://localhost:4000/api';
const API_BASE = process.env.REACT_APP_API_BASE;
const USER_API = `${API_BASE}/users`;

export const findAllUsers = async () => {
    const response = await axios.get(USER_API);
    const allUsers = response.data;
    return allUsers;
}

