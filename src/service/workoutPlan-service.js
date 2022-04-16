import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const WORKOUTPLANAPI = `${API_BASE}/workoutplans`;

const api = axios.create({
  withCredentials: true,
});

export const findAllWorkoutPlans = async () => {
  const response = await api.get(`${WORKOUTPLANAPI}`);
  return response.data;
};

export const findTrainerWorkouts = async (uid) => {
    const response = await api.get(`${WORKOUTPLANAPI}/trainer/${uid}`);
    return response.data;
}

export const createWorkoutPlan = async (workoutPlan) => {
  const response = await api.post(`${WORKOUTPLANAPI}`, workoutPlan);
  return response.data;
};

export const deleteWorkoutPlan = async (wkplanId) => {
  const status = await api.delete(`${WORKOUTPLANAPI}/${wkplanId}`);
  return status;
};
