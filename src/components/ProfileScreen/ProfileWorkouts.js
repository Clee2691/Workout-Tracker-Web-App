import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const userWorkouts = (state) => state.workoutLogReducer;

const ProfileWorkouts = () => {
  const allWorkouts = useSelector(userWorkouts);

  return (
    <div>
      {allWorkouts.length > 0 &&
        <div className="d-flex justify-content-center mb-2 align-items-center">
        <h1 className="mt-2 ms-auto me-auto">Your Workouts</h1>
        <Link to="/workout-log">
          <button className="btn btn-primary btn-lg">
            <i className="fa-solid fa-plus me-2"></i>Add Workout
          </button>
        </Link>
      </div>
      }
      {allWorkouts.length > 0 &&
        allWorkouts.map((workout) => {
          return (
            <div key={workout._id}>
              <div className="card bg-primary mb-2">
                <div className="row g-0">
                  <div className="col-md-5 col-lg-4">
                    <img
                      className="img-fluid rounded-start"
                      src="../images/avatars/profilemale1.jpg"
                    ></img>
                  </div>
                  <div className="col-md d-flex border">
                    <div className="card-body align-self-center text-center p-1">
                      <h4 className="card-title">
                        {workout.exName} | {workout.date}
                      </h4>
                      {workout.sets.map((set) => {
                        return (
                          <p className="card-text" key={set._id}>
                            Set: {set.set + 1} | Weight: {set.weight}lbs x{" "}
                            {set.reps} reps
                          </p>
                        );
                      })}
                    </div>
                  </div>
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
