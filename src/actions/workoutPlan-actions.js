import * as service from "../service/workoutPlan-service.js";

export const GET_ALL_WKOUT_PLANS = "GET_ALL_WKOUT_PLANS";
export const GET_TRAINER_PLANS = "GET_TRAINER_PLANS";
export const CREATE_WORKOUT_PLAN = "CREATE_WORKOUT_PLAN";
export const DELETE_WORKOUT_PLAN = "DELETE_WORKOUT_PLAN";

export const GetAllWorkoutPlans = async (dispatch) => {
    const allWorkoutPlans = await service.findAllWorkoutPlans();
    dispatch({
      type: GET_ALL_WKOUT_PLANS,
      allWorkoutPlans,
    });
}

export const GetTrainerWorkoutPlans = async (dispatch, uid) => {
  const trainerPlans = await service.findTrainerWorkouts(uid);
  dispatch({
    type: GET_TRAINER_PLANS,
    trainerPlans,
  });
};

export const CreateWorkoutPlan = async (dispatch, workout) => {
  const insertedWorkoutPlan = await service.createWorkoutPlan(workout);
  dispatch({
    type: CREATE_WORKOUT_PLAN,
    insertedWorkoutPlan,
  });
};

export const DeleteWorkoutPlan = async (dispatch, workoutplanId) => {
  const status = await service.deleteWorkoutPlan(workoutplanId);
  dispatch({
    type: DELETE_WORKOUT_PLAN,
    workoutplanId,
  });
};
