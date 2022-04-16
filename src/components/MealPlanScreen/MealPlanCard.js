const MealPlanCard = ({ meal }) => {
  return (
    <div key={meal._id}>
      <div className="card bg-success mb-2 border ms-4 me-4">
        <div className="row g-0">
          <div className="col-md-5 col-lg-4 d-flex align-self-center">
            <img
              className="img-fluid rounded-circle p-2"
              src="../images/food/mealicon.png"
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body text-center p-1 mt-4 mb-2">
              <h2 className="card-title">{meal.name}</h2>
              <div>
                Plan created by:{" "}
                <a
                  href={`/profile/${meal.nutritionistId}`}
                  className="text-decoration-none text-dark"
                >
                  {meal.nutritionistName}
                </a>
              </div>
              {meal.foods.map((food) => {
                return (
                  <p className="fs-5 card-text" key={food._id}>
                    Name: {food.foodName} | Portion Size: {food.portionSize}{" "}
                    {food.unitOfMeasure}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;