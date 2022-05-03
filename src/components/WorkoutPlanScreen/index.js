import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import WorkoutPlanCard from "./WorkoutPlanInfo";

import { GetUser } from "../../actions/user-actions";
import {
  GetAllWorkoutPlans,
  CreateWorkoutPlan,
} from "../../actions/workoutPlan-actions";

const WorkoutPlanScreen = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer);

  const allWorkoutPlans = useSelector((state) => state.workoutPlanReducer);

  const [formErrors, setFormErrors] = useState({});
  const [workoutplan, setWorkoutPlan] = useState();
  const [exerciseList, setExerciseList] = useState([
    {
      exerciseId: Math.random().toString(20).substring(2, 18),
      exName: "",
      exNumSets: 0,
      exNumReps: 0,
    },
  ]);

  // Allows trainers to add a plan
  const [makePlan, setMakePlan] = useState(false);

  useEffect(() => {
    GetUser(dispatch);
    GetAllWorkoutPlans(dispatch);
  }, [dispatch]);

  const exerciseInputHandler = (event, index) => {
    const { name, value } = event.target;
    const currList = [...exerciseList];
    currList[index][name] = value;
    setExerciseList(currList);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setWorkoutPlan({ [name]: value });
  };

  const addButtonHandler = () => {
    setExerciseList([
      ...exerciseList,
      {
        exerciseId: Math.random().toString(20).substring(2, 18),
        exName: "",
        exNumSets: 0,
        exNumReps: 0,
      },
    ]);
  };

  const removeBtnHandler = (index) => {
    const currExList = [...exerciseList];
    const selectedExercise = currExList[index];
    const filteredArray = currExList.filter(
      (exercise) => exercise.exerciseId !== selectedExercise.exerciseId
    );
    setExerciseList(filteredArray);
  };

  const planValidation = (thePlan) => {
    let errorList = { ...formErrors };

    if (!thePlan.name) {
      errorList.planNameErr = "Plan must have a name!";
    } else if (thePlan.name && formErrors.planNameErr) {
      delete errorList.planNameErr;
    }

    //exercises need a name and sets/reps need to be more than 0
    thePlan.exercises.forEach((ex) => {
      if (!ex.exName) {
        errorList.exnameerr = "Exercises must have a name!";
      } else {
        delete errorList.exnameerr;
      }

      if (!ex.exNumSets > 0) {
        errorList.exsetserr = "Exercise sets must be 1 or more!";
      } else {
        delete errorList.exsetserr;
      }
      if (!ex.exNumReps > 0) {
        errorList.exnumrepserr = "Exercise reps must be 1 or more!";
      } else {
        delete errorList.exnumrepserr;
      }
    });
    setFormErrors(errorList);

    if (Object.keys(errorList).length !== 0) {
      return false;
    }
    return true;
  };

  const saveWorkoutPlanHandler = () => {
    const newPlan = {
      trainerId: loggedInUser._id,
      trainerName: loggedInUser.username,
      ...workoutplan,
      exercises: exerciseList,
    };
    const isValid = planValidation(newPlan);

    if (isValid) {
      CreateWorkoutPlan(dispatch, newPlan);
      alert("Plan Added Successfully!");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container col-md-10 col-lg-8">
        <h1 className="text-center mt-2">
          Workout Plans
          {/* If logged in as a trainer, allow to make a plan */}
          {loggedInUser && loggedInUser.userRole === "trainer" && !makePlan && (
            <span className="container mt-2">
              <button
                className="btn btn-success"
                onClick={() => {
                  setMakePlan(!makePlan);
                }}
              >
                <i className="fa fa-plus me-2"></i>Plan
              </button>
            </span>
          )}
          {loggedInUser && loggedInUser.userRole === "trainer" && makePlan && (
            <span className="container mt-2">
              <button
                className="btn btn-danger"
                onClick={() => {
                  setMakePlan(!makePlan);
                }}
              >
                <i className="fa fa-minus me-2"></i>Plan
              </button>
            </span>
          )}
        </h1>

        {makePlan && loggedInUser.userRole === "trainer" && (
          <div className="col-md-10 ms-auto me-auto">
            <div className="d-grid">
              <button
                className="btn btn-success"
                onClick={saveWorkoutPlanHandler}
              >
                Create Plan
              </button>
            </div>
            <div className="input-group mt-2 mb-2">
              <label className="form-label me-2" htmlFor="planNameInput">
                Plan Name:{" "}
              </label>
              <input
                name="name"
                type="text"
                className="form-control"
                id="planNameInput"
                placeholder="Push/Pull/Legs"
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
            </div>
            {formErrors && formErrors.planNameErr && (
              <p className="text-danger">{formErrors.planNameErr}</p>
            )}
            <h4 className="text-center">Exercises</h4>
            {exerciseList.map((exercise, arrayIndex) => {
              return (
                <div key={exercise.exerciseId}>
                  <div className="input-group mt-2 mb-2">
                    <label className="form-label me-2" htmlFor="exNameInput">
                      Exercise Name:
                    </label>
                    <input
                      name="exName"
                      type="text"
                      className="form-control"
                      id="exNameInput"
                      placeholder="Squat"
                      defaultValue={exercise.exName}
                      onChange={(e) => {
                        exerciseInputHandler(e, arrayIndex);
                      }}
                    />
                  </div>

                  <div className="input-group mt-2 mb-2">
                    <label
                      className="form-label ms-2 me-2"
                      htmlFor="exNumSetsInput"
                    >
                      Number of Sets:
                    </label>
                    <input
                      name="exNumSets"
                      type="number"
                      min={0}
                      className="form-control me-2"
                      id="exNumSetsInput"
                      placeholder="0"
                      defaultValue={exercise.exNumSets}
                      onChange={(e) => {
                        exerciseInputHandler(e, arrayIndex);
                      }}
                    />

                    <label className="form-label me-2" htmlFor="exNumRepsInput">
                      Number of Reps:
                    </label>
                    <input
                      name="exNumReps"
                      type="number"
                      min={0}
                      className="form-control"
                      id="exNumRepsInput"
                      defaultValue={exercise.exNumReps}
                      placeholder="0"
                      onChange={(e) => {
                        exerciseInputHandler(e, arrayIndex);
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    {exerciseList.length - 1 === arrayIndex && (
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => addButtonHandler()}
                      >
                        <i className="fa-solid fa-plus me-2"></i>Add Exercise
                      </button>
                    )}
                    {exerciseList.length !== 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeBtnHandler(arrayIndex)}
                      >
                        <i className="fa-solid fa-minus me-2"></i>Remove
                        Exercise
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {formErrors && formErrors.exnameerr && (
              <p className="text-danger">{formErrors.exnameerr}</p>
            )}
            {formErrors && formErrors.exsetserr && (
              <p className="text-danger">{formErrors.exsetserr}</p>
            )}
            {formErrors && formErrors.exnumrepserr && (
              <p className="text-danger">{formErrors.exnumrepserr}</p>
            )}
          </div>
        )}
        <hr className="ms-4 me-4"></hr>
        {/* All workout plans can be seen by anyone */}
        <div className="container mt-2 col-xl-10">
          {allWorkoutPlans &&
            allWorkoutPlans.map((plan) => {
              return <WorkoutPlanCard workout={plan} key={plan._id} />;
            })}
        </div>
      </div>
      <footer className="text-center mb-2">
        &copy; Calvin Lee 2022 -
        <Link to="/privacypol" className="text-decoration-none">
          <span className="ms-2">Privacy Policy</span>
        </Link>
      </footer>
    </>
  );
};

export default WorkoutPlanScreen;
