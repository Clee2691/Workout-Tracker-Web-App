import {
  CREATE_WORKOUT,
  GET_USER_WORKOUTS,
  DELETE_WORKOUT,
} from "../actions/workout-actions";

const workoutLogReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_WORKOUT:
      const newWorkouts = [...state, action.insertedWorkout];
      return newWorkouts;

    case GET_USER_WORKOUTS:
      return action.allWorkouts;

    case DELETE_WORKOUT:
      return state.filter((workout) => workout._id !== action.workoutId);

    default:
      return state;
  }
};

export default workoutLogReducer;
