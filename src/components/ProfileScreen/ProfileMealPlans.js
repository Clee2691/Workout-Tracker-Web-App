import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  DeleteMealPlan,
  GetNutriMealPlans,
} from "../../actions/mealPlan-actions";

const ProfileMealPlans = ({ userId }) => {
  const dispatch = useDispatch();
  const allMealPlans = useSelector((state) => state.mealPlanReducer);

  const getUserMealPlans = async () => {
    await GetNutriMealPlans(dispatch, userId);
  };

  useEffect(() => {
    getUserMealPlans();
  }, []);

  const deleteBtnHandler = (mealPlanId) => {
    DeleteMealPlan(dispatch, mealPlanId);
  };

  return (
    <div>
      {allMealPlans.length > 0 &&
        allMealPlans.map((mealPlan) => {
          return (
            <div key={mealPlan._id}>
              <div className="card bg-success mb-2 border ms-4 me-4">
                <div className="row g-0">
                  <div className="col-md-5 col-lg-4 d-flex align-self-center">
                    <img
                      className="img-fluid rounded-circle p-2"
                      src="../images/food/mealicon.png"
                    ></img>
                  </div>
                  <div className="col-md d-flex">
                    <div className="card-body align-self-center text-center p-1">
                      <h4 className="card-title">{mealPlan.name}</h4>
                      <div>
                        Plan created by:{" "}
                        <Link
                          to={`/profile/${mealPlan.nutritionistId}`}
                          className="text-decoration-none text-dark"
                        >
                          {mealPlan.nutritionistName}
                        </Link>
                      </div>
                      {mealPlan.foods.map((food) => {
                        return (
                          <p className="card-text" key={food._id}>
                            Food: {food.foodName} | Portion: {food.portionSize}{" "}
                            {food.unitOfMeasure}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {allMealPlans.nutritionistId ===
                  localStorage.getItem("uid") && (
                  <div className="card-footer d-flex justify-content-center bg-info">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteBtnHandler(mealPlan._id);
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
      {allMealPlans.length < 1 && (
        <>
          <h3 className="text-center mt-2">
            You have no meal plans, why don't you create one!
          </h3>
        </>
      )}
    </div>
  );
};

export default ProfileMealPlans;
