import * as service from "../service/client-trainer-service.js";

export const GetClientTrainers = async (clientId) => {
  const allTrainers = service.findClientTrainers(clientId);
  return allTrainers;
};
export const GetTrainerClients = async (trainerId) => {
  const allClients = service.findTrainerClients(trainerId);
  return allClients;
};
export const CreateRelation = async (relation) => {
  const insertedRelation = service.createRelation(relation);
  return insertedRelation;
};

export const DeleteRelation = async (relationId) => {
    const status = service.deleteRelation(relationId);
}

export const GetExisitingRelation = async(clientId, trainerId) => {
    const relation = service.findExistingRelation(clientId, trainerId);
    return relation;
}