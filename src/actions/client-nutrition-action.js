import * as service from "../service/client-nutrition-service.js";

export const GetClientNutrition = async (clientId) => {
  const allTrainers = service.findClientNutrition(clientId);
  return allTrainers;
};
export const GetNutritionClients = async (nutritionistId) => {
  const allClients = service.findNutritionClients(nutritionistId);
  return allClients;
};
export const CreateRelation = async (relation) => {
  const insertedRelation = service.createRelation(relation);
  return insertedRelation;
};

export const DeleteRelation = async (relationId) => {
  const status = service.deleteRelation(relationId);
};

export const GetExistingRelation = async (clientId, nutritionistId) => {
      const relation = service.findExistingRelation(clientId, nutritionistId);
      return relation;
}