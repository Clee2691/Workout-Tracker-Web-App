import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const WORKOUTAPI = `${API_BASE}/workout`;

const api = axios.create({
    withCredentials: true
});

export const findAllUserWorkouts = async (uid) => {
    const response = await api.get(`${WORKOUTAPI}/user/${uid}`)
    return response.data;
}

export const createWorkout = async (workout) => {
    const response = await api.post(`${WORKOUTAPI}`, workout);
    return response.data;
}

export const deleteWorkout = async (workoutId) => {
    const status = await api.delete(`${WORKOUTAPI}/${workoutId}`);
    return status;
}