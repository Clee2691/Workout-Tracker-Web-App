import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NavigationBar from "../NavigationBar";
import MealPlanCard from "./MealPlanCard";

import { GetUser } from "../../actions/user-actions";
import {
  CreateMealPlan,
  GetAllMealPlans,
} from "../../actions/mealPlan-actions";

const MealPlanScreen = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.userReducer);

  const allMealPlans = useSelector((state) => state.mealPlanReducer);

  const [formErrors, setFormErrors] = useState({});
  const [mealPlan, setMealPlan] = useState();
  const [foodList, setFoodList] = useState([
    {
      foodId: Math.random().toString(20).substring(2, 18),
      foodName: "",
      portionSize: 0,
      unitOfMeasure: "",
    },
  ]);

  const [makePlan, setMakePlan] = useState(false);

  useEffect(() => {
    GetUser(dispatch);
    GetAllMealPlans(dispatch);
  }, [dispatch]);

  const foodInputHandler = (event, index) => {
    const { name, value } = event.target;
    const currList = [...foodList];
    currList[index][name] = value;
    setFoodList(currList);
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setMealPlan({ [name]: value });
  };

  const addButtonHandler = () => {
    setFoodList([
      ...foodList,
      {
        foodId: Math.random().toString(20).substring(2, 18),
        foodName: "",
        portionSize: 0,
        unitOfMeasure: "",
      },
    ]);
  };

  const removeBtnHandler = (index) => {
    const currFoodList = [...foodList];
    const selectedFood = currFoodList[index];
    const filteredArray = currFoodList.filter(
      (food) => food.foodId !== selectedFood.exerciseId
    );
    setFoodList(filteredArray);
  };

  const planValidation = (thePlan) => {
    let errorList = { ...formErrors };

    if (!thePlan.name) {
      errorList.planNameErr = "Plan must have a name!";
    } else if (thePlan.name && formErrors.planNameErr) {
      delete errorList.planNameErr;
    }

    //exercises need a name and sets/reps need to be more than 0
    thePlan.foods.forEach((food) => {
      if (!food.foodName) {
        errorList.foodNameErr = "Food must have a name!";
      } else {
        delete errorList.foodNameErr;
      }

      if (!food.portionSize > 0) {
        errorList.psizeError = "Portion size must be 1 or more!";
      } else {
        delete errorList.psizeError;
      }
      if (!food.unitOfMeasure) {
        errorList.uomError = "Must have a unit of measure!";
      } else {
        delete errorList.uomError;
      }
    });
    setFormErrors(errorList);

    if (Object.keys(errorList).length !== 0) {
      return false;
    }
    return true;
  };

  const saveMealPlanHandler = () => {
    const newPlan = {
      nutritionistId: loggedInUser._id,
      nutritionistName: loggedInUser.username,
      ...mealPlan,
      foods: foodList,
    };

    const isValid = planValidation(newPlan);
    if (isValid) {
      CreateMealPlan(dispatch, newPlan);
      alert("Plan Added Successfully!");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="container col-md-8">
        <h1 className="text-center mt-2">
          Meal Plans
          {/* If logged in as a trainer, allow to make a plan */}
          {loggedInUser &&
            loggedInUser.userRole === "nutritionist" &&
            !makePlan && (
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
          {loggedInUser &&
            loggedInUser.userRole === "nutritionist" &&
            makePlan && (
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

        {makePlan && loggedInUser.userRole === "nutritionist" && (
          <div className="col-md-8 ms-auto me-auto">
            <div className="d-grid">
              <button className="btn btn-success" onClick={saveMealPlanHandler}>
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
                placeholder="Keto..."
                onChange={(e) => {
                  inputChangeHandler(e);
                }}
              />
            </div>
            {formErrors && formErrors.planNameErr && (
              <p className="text-danger">{formErrors.planNameErr}</p>
            )}
            <h4 className="text-center">Foods</h4>
            {foodList.map((food, arrayIndex) => {
              return (
                <div key={food.foodId}>
                  <div className="input-group mt-2 mb-2">
                    <label className="form-label me-2" htmlFor="foodNameInput">
                      Food Name:
                    </label>
                    <input
                      name="foodName"
                      type="text"
                      className="form-control"
                      id="foodNameInput"
                      placeholder="Carrots"
                      defaultValue={food.foodName}
                      onChange={(e) => {
                        foodInputHandler(e, arrayIndex);
                      }}
                    />

                    <label
                      className="form-label ms-2 me-2"
                      htmlFor="portionSizeInput"
                    >
                      Portion Size:
                    </label>
                    <input
                      name="portionSize"
                      type="number"
                      min={0}
                      className="form-control me-2"
                      id="portionSizeInput"
                      placeholder="0"
                      defaultValue={food.portionSize}
                      onChange={(e) => {
                        foodInputHandler(e, arrayIndex);
                      }}
                    />

                    <label className="form-label me-2" htmlFor="uomInput">
                      Unit of Measure:
                    </label>
                    <input
                      name="unitOfMeasure"
                      type="text"
                      className="form-control"
                      id="uomInput"
                      defaultValue={food.unitOfMeasure}
                      placeholder="cups"
                      onChange={(e) => {
                        foodInputHandler(e, arrayIndex);
                      }}
                    />
                  </div>

                  <div className="mb-2">
                    {foodList.length - 1 === arrayIndex && (
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => addButtonHandler()}
                      >
                        <i className="fa-solid fa-plus me-2"></i>Food
                      </button>
                    )}
                    {foodList.length !== 1 && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeBtnHandler(arrayIndex)}
                      >
                        <i className="fa-solid fa-minus me-2"></i>Food
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
            {formErrors && formErrors.foodNameErr && (
              <p className="text-danger">{formErrors.foodNameErr}</p>
            )}
            {formErrors && formErrors.psizeError && (
              <p className="text-danger">{formErrors.psizeError}</p>
            )}
            {formErrors && formErrors.uomError && (
              <p className="text-danger">{formErrors.uomError}</p>
            )}
          </div>
        )}

        {/* All meal plans can be seen by anyone */}
        <hr className="ms-4 me-4"></hr>
        <div className="container mt-2">
          {allMealPlans &&
            allMealPlans.map((plan) => {
              return (
                <div key={plan._id}>
                  <MealPlanCard meal={plan} />
                </div>
              );
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

export default MealPlanScreen;
