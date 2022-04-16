import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const CLIENTTRAINERAPI = `${API_BASE}/client-trainer`;

const api = axios.create({
  withCredentials: true,
});

export const findClientTrainers = async (clientId) => {
  const response = await api.get(`${CLIENTTRAINERAPI}/client/${clientId}`);
  return response.data;
};

export const findTrainerClients = async (trainerId) => {
  const response = await api.get(`${CLIENTTRAINERAPI}/trainer/${trainerId}`);
  return response.data;
};

export const createRelation= async (relation) => {
  const response = await api.post(`${CLIENTTRAINERAPI}`, relation);
  return response.data;
};

export const deleteRelation = async (relationId) => {
    const response = await api.delete(`${CLIENTTRAINERAPI}/${relationId}`);
    return response.data;
}

export const findExistingRelation = async (clientId, trainerId) => {
  const response = await api.get(
    `${CLIENTTRAINERAPI}/${clientId}/${trainerId}`
  );
  return response.data;
}