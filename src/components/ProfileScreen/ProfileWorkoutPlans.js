import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  DeleteWorkoutPlan,
  GetTrainerWorkoutPlans,
} from "../../actions/workoutPlan-actions";

const ProfileWorkoutPlans = ({ userId }) => {
  const dispatch = useDispatch();
  const allWorkoutPlans = useSelector((state) => state.workoutPlanReducer);

  const getTrainerPlans = async () => {
    await GetTrainerWorkoutPlans(dispatch, userId);
  };

  useEffect(() => {
    getTrainerPlans();
  }, []);

  const deleteBtnHandler = (workoutPlanId) => {
    DeleteWorkoutPlan(dispatch, workoutPlanId);
  };

  return (
    <div>
      {allWorkoutPlans.length > 0 &&
        allWorkoutPlans.map((wkoutPlan) => {
          return (
            <div key={wkoutPlan._id}>
              <div className="card bg-info mb-2 border ms-4 me-4">
                <div className="row g-0">
                  <div className="col-md-5 col-lg-4 d-flex align-self-center">
                    <img
                      className="img-fluid rounded-circle p-2"
                      src="../images/workout/workoutplan.jpg"
                    ></img>
                  </div>
                  <div className="col-md d-flex">
                    <div className="card-body align-self-center text-center p-1">
                      <h4 className="card-title">{wkoutPlan.name}</h4>
                      {wkoutPlan.exercises.map((exercise) => {
                        return (
                          <p className="card-text" key={exercise._id}>
                            Exercise: {exercise.exName} | Sets:{" "}
                            {exercise.exNumSets} x Reps: {exercise.exNumReps}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {wkoutPlan.trainerId === localStorage.getItem("uid") && (
                  <div className="card-footer d-flex justify-content-center bg-info">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteBtnHandler(wkoutPlan._id);
                      }}
                    >
                      DELETE
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      {allWorkoutPlans.length < 1 && (
        <>
          <h3 className="text-center mt-2">
            You have no workout plans, create one now!
          </h3>
        </>
      )}
    </div>
  );
};

export default ProfileWorkoutPlans;
