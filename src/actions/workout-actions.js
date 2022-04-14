import * as service from "../service/workout-service";

export const GET_USER_WORKOUTS = "GET_USER_WORKOUTS";
export const CREATE_WORKOUT = "CREATE_WORKOUT";
export const DELETE_WORKOUT = "DELETE_WORKOUT";

export const GetUserWorkouts = async (dispatch, uid) => {
  const allWorkouts = await service.findAllUserWorkouts(uid);
  dispatch({
    type: GET_USER_WORKOUTS,
    allWorkouts,
  });
};

export const CreateUserWorkout = async (dispatch, workout) => {
  const insertedWorkout = await service.createWorkout(workout);
  dispatch({
    type: CREATE_WORKOUT,
    insertedWorkout,
  });
};

export const DeleteWorkout = async (dispatch, workoutId) => {
  const status = await service.deleteWorkout(workoutId);
  dispatch({
    type: DELETE_WORKOUT,
    workoutId,
  });
};
