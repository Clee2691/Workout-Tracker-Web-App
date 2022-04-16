import * as service from "../service/client-trainer-service.js";

export const GetClientTrainers = async (clientId) => {
  const allTrainers = await service.findClientTrainers(clientId);
  return allTrainers;
};
export const GetTrainerClients = async (trainerId) => {
  const allClients = await service.findTrainerClients(trainerId);
  return allClients;
};
export const CreateRelation = async (relation) => {
  const insertedRelation = await service.createRelation(relation);
  return insertedRelation;
};

export const DeleteRelation = async (relationId) => {
    const status = await service.deleteRelation(relationId);
}

export const GetExisitingRelation = async(clientId, trainerId) => {
    const relation = await service.findExistingRelation(clientId, trainerId);
    return relation;
}