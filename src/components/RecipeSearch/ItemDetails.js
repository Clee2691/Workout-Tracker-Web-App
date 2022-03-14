import React from "react";
import NavigationBar from "../NavigationBar";

const ItemDetails = () => {
  return (
    <>
      <NavigationBar />

      <div className="container-fluid mt-2 mb-2">
        <h1 className="text-center">Chicken Vesuvio</h1>
        <img
          className="img-fluid rounded mx-auto d-block"
          src="https://www.edamam.com/web-img/e42/e42f9119813e890af34c259785ae1cfb.jpg"
        ></img>

        {/* The item details */}
        <div className="container">
          <div className="d-flex justify-content-center mt-2">
            <h4 className="lead me-4">
              <i className="fa-solid fa-blender"></i> Calories: 100
            </h4>
            <p>
              <i className="fa-solid fa-utensils"></i> Number of Servings: 4
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <p className="me-4 fs-4">
              <i className="fa-solid fa-egg text-success"></i> Protein: 100g
            </p>
            <p className="me-4 fs-4">
              <i className="fa-solid fa-bread-slice text-warning"></i> Carbs: 200g
            </p>
            <p className="fs-4">
              <i className="fa-solid fa-bacon text-danger"></i> Fat: 100g
            </p>
          </div>

          <h4>Other Nutrients</h4>
          <p>Cholesterol</p>
          <p>Sodium</p>
        </div>

        {/* Item reviews */}
        <div className="container">
          <h4>User Reviews</h4>
          <a href="#">User 1</a>
          <p>I love it! Best chicken recipe ever</p>
          <p>Review 2</p>
          <p>Review 3</p>
          <p>Review 4</p>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
