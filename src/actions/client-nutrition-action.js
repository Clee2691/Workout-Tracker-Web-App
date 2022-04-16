import * as service from "../service/client-nutrition-service.js";

export const GetClientNutrition = async (clientId) => {
  const allTrainers = await service.findClientNutrition(clientId);
  return allTrainers;
};
export const GetNutritionClients = async (nutritionistId) => {
  const allClients = await service.findNutritionClients(nutritionistId);
  return allClients;
};
export const CreateRelation = async (relation) => {
  const insertedRelation = await service.createRelation(relation);
  return insertedRelation;
};

export const DeleteRelation = async (relationId) => {
  const status = await service.deleteRelation(relationId);
};

export const GetExistingRelation = async (clientId, nutritionistId) => {
      const relation = await service.findExistingRelation(
        clientId,
        nutritionistId
      );
      return relation;
}