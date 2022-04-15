import {
  GET_TRAINER_PLANS,
  CREATE_WORKOUT_PLAN,
  DELETE_WORKOUT_PLAN,
  GET_ALL_WKOUT_PLANS
} from "../actions/workoutPlan-actions";

const workoutPlanReducer = (state = [], action) => {
  switch (action.type) {

    case GET_ALL_WKOUT_PLANS:
        return action.allWorkoutPlans;

    case CREATE_WORKOUT_PLAN:
      const newWorkoutPlans = [...state, action.insertedWorkoutPlan];
      return newWorkoutPlans;

    case GET_TRAINER_PLANS:
      return action.trainerPlans;

    case DELETE_WORKOUT_PLAN:
      return state.filter((workout) => workout._id !== action.workoutplanId);

    default:
      return state;
  }
};

export default workoutPlanReducer;
