import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format, parse } from "date-fns";

import { DeleteWorkout } from "../../actions/workout-actions";

const ProfileWorkouts = () => {
  const allWorkouts = useSelector((state) => state.workoutLogReducer);

  const dispatch = useDispatch();

  const deleteBtnHandler = (workoutId) => {
    DeleteWorkout(dispatch, workoutId);
  };

  return (
    <div>
      {allWorkouts.length > 0 && (
        <div className="d-flex justify-content-center mb-2">
          <Link to="/workout-log">
            <button className="btn btn-primary btn-lg">
              <i className="fa-solid fa-plus me-2"></i>Add Workout
            </button>
          </Link>
        </div>
      )}
      {allWorkouts.length > 0 &&
        allWorkouts.map((workout) => {
          return (
            <div key={workout._id}>
              <div className="card bg-primary mb-2 border ms-4 me-4">
                <div className="row g-0">
                  <div className="col-md-5 col-lg-4 d-flex align-self-center">
                    <img
                      className="img-fluid rounded-circle p-2"
                      src="../images/workout/Dumbell2.png"
                    ></img>
                  </div>
                  <div className="col-md d-flex">
                    <div className="card-body align-self-center text-center p-1">
                      <h4 className="card-title">
                        {workout.exerciseName} | Date:{" "}
                        {format(
                          parse(workout.exDate, "yyyy-MM-dd", new Date()),
                          "dd MMM yyyy"
                        )}
                      </h4>
                      {workout.sets.map((set) => {
                        return (
                          <p className="card-text" key={set._id}>
                            Set: {set.setNum + 1} | Weight: {set.weight}lbs x{" "}
                            {set.reps} reps
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="card-footer d-flex justify-content-center bg-info">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteBtnHandler(workout._id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      {allWorkouts.length < 1 && (
        <>
          <h3 className="text-center mt-2">
            You have no workouts, why don't you try logging some workouts!
          </h3>
          <div className="d-flex justify-content-center">
            <Link to="/workout-log">
              <button className="btn btn-primary btn-lg mt-2">
                Log a Workout!
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileWorkouts;
