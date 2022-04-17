import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavigationBar from "../NavigationBar";
import LoginScreen from "../LoginScreen";
import { GetUser } from "../../actions/user-actions";

import { CreateUserWorkout } from "../../actions/workout-actions";

const WorkoutLog = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer);

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    GetUser(dispatch);
  }, [dispatch]);

  const todaysDate = new Date();
  const dateStr =
    todaysDate.getFullYear() +
    "-" +
    String(todaysDate.getMonth() + 1).padStart(2, 0) +
    "-" +
    String(todaysDate.getDate()).padStart(2, 0);

  const [workoutSets, setWkSets] = useState([
    {
      setId: Math.random().toString(20).substring(2, 18),
      setNum: 0,
      weight: 0,
      reps: 0,
    },
  ]);

  const [wkoutInfo, setWkoutInfo] = useState({
    exerciseName: "",
    exDate: dateStr,
    sets: workoutSets,
  });

  const wkouttSetinpChngHdler = (event, index) => {
    const { name, value } = event.target;
    const currSets = [...workoutSets];
    // Add a new set
    currSets[index][name] = value;
    setWkSets(currSets);
  };

  // Handles exercise name and date changes
  const nameDateInputHandler = (event) => {
    const { name, value } = event.target;
    const newWorkout = {
      ...wkoutInfo,
      [name]: value,
    };
    setWkoutInfo(newWorkout);
  };

  const addButtonHandler = (index) => {
    setWkSets([
      ...workoutSets,
      {
        setId: Math.random().toString(20).substring(2, 18),
        setNum: index + 1,
        weight: 0,
        reps: 0,
      },
    ]);
  };

  const removeBtnHandler = (index) => {
    const currSets = [...workoutSets];
    currSets.splice(index, 1);
    setWkSets(currSets);
  };

  const planValidation = (thePlan) => {
    let errorList = { ...formErrors };

    if (!thePlan.exerciseName) {
      errorList.exNameErr = "Exercise must have a name!";
    } else if (thePlan.exerciseName && formErrors.exNameErr) {
      delete errorList.exNameErr;
    }

    //exercises need a name and sets/reps need to be more than 0
    thePlan.sets.forEach((ex) => {
      if (!ex.weight > 0) {
        errorList.exWeightError = "Must lift more than 0 lbs!";
      } else {
        delete errorList.exWeightError;
      }
      if (!ex.reps > 0) {
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

  const saveWorkoutBtnHandler = () => {
    const combInfo = {
      userId: loggedInUser._id,
      ...wkoutInfo,
      sets: workoutSets,
    };
    const isValid = planValidation(combInfo);
    if (isValid) {
      CreateUserWorkout(dispatch, combInfo);
      alert("Workout Successfully Added!");
    }
  };

  if (!loggedInUser) {
    return <LoginScreen />;
  } else {
    return (
      <>
        <NavigationBar currScreen={"TRACKWORKOUT"} />
        <div className="container">
          <h1 className="text-center mt-2">Workout Tracker</h1>
          <div className="col-md-8 ms-auto me-auto">
            <div className="input-group mb-2 mt-2">
              <label className="form-label me-2" htmlFor="exerciseNameInput">
                Exercise
              </label>
              <input
                name="exerciseName"
                type="text"
                className="form-control"
                id="exerciseNameInput"
                placeholder="Squat, Bench Press, etc..."
                onChange={nameDateInputHandler}
              />
            </div>
            {formErrors && formErrors.exNameErr && (
              <p className="text-danger">{formErrors.exNameErr}</p>
            )}
            <div className="input-group mb-2">
              <label className="form-label me-2" htmlFor="date">
                Date
              </label>
              <input
                name="exDate"
                type="date"
                min="1991-01-01"
                max={dateStr}
                className="form-control rounded-corner"
                defaultValue={wkoutInfo.exDate}
                onChange={nameDateInputHandler}
              />
            </div>
            {workoutSets.map((aSet, arrayIndex) => {
              return (
                <div key={aSet.setId}>
                  <div className="input-group mb-2">
                    <label className="form-label me-2" htmlFor="setInput">
                      Set #
                    </label>
                    <input
                      name="setNum"
                      id="setInput"
                      type="number"
                      className="form-control me-2"
                      min="1"
                      defaultValue={arrayIndex + 1}
                      onChange={(event) =>
                        wkouttSetinpChngHdler(event, arrayIndex)
                      }
                    />
                    <label className="form-label me-2" htmlFor="weightInput">
                      Weight (lbs)
                    </label>
                    <input
                      name="weight"
                      id="weightInput"
                      type="number"
                      className="form-control me-2"
                      min="0"
                      defaultValue={aSet.weight}
                      onChange={(event) =>
                        wkouttSetinpChngHdler(event, arrayIndex)
                      }
                    />
                    <label className="form-label me-2" htmlFor="repsInput">
                      Reps
                    </label>
                    <input
                      name="reps"
                      id="repsInput"
                      type="number"
                      className="form-control"
                      min="0"
                      defaultValue={aSet.reps}
                      onChange={(event) =>
                        wkouttSetinpChngHdler(event, arrayIndex)
                      }
                    />
                  </div>
                  <div className="mb-2">
                    {workoutSets.length - 1 === arrayIndex && (
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => addButtonHandler(arrayIndex)}
                      >
                        <i className="fa-solid fa-plus me-2"></i>Add Set
                      </button>
                    )}
                    {workoutSets.length !== 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeBtnHandler(arrayIndex)}
                      >
                        <i className="fa-solid fa-minus me-2"></i>Remove Set
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {formErrors && formErrors.exWeightError && (
              <p className="text-danger">{formErrors.exWeightError}</p>
            )}
            {formErrors && formErrors.exnumrepserr && (
              <p className="text-danger">{formErrors.exnumrepserr}</p>
            )}

            <div className="d-grid">
              <button
                className="btn btn-success"
                onClick={saveWorkoutBtnHandler}
              >
                Add workout
              </button>
            </div>
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
  }
};

export default WorkoutLog;
