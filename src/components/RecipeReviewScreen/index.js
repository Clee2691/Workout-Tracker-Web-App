import React from "react";

const RecipeReviewScreen = ({ profileScreen }) => {
  // If in profile screen, get user's recipe reviews
  // If on homepage get the 5 most recent reviews

  return (
    <>
      {!profileScreen && (
        <h1 className="text-center mb-2">Latest Reviewed Recipes</h1>
      )}
      {profileScreen && (
        <h1 className="text-center mb-2">Your Recipe Reviews</h1>
      )}

      {/* Map this to a list of reviewed recipes */}
      <div className="card bg-transparent mb-2 border">
        <div className="row g-0">
          <div className="col-md-6 col-lg-4 d-flex align-self-center">
            <img
              className="img-fluid rounded-circle"
              src="../images/avatars/profilemale1.jpg"
            ></img>
          </div>
          <div className="col-md d-flex">
            <div className="card-body align-self-start text-center p-1">
              <h2 className="card-title">
                Recipe:
                <a className="text-decoration-none ms-1" href="#">
                  Chicken Pasta
                </a>
              </h2>
              <p>
                Reviewed By: <a href="#">SomeUser1</a> on 2022-01-15
              </p>
              <p># stars: ****</p>
              <p>
                Dimentum pulvinar ipsum eget efficitur. Aenean tempus lacus
                felis, nec sagittis mauris interdum in. Sed purus ante, cursus
                sed ipsum et, venenatis venenatis ex. Praesent egestas diam sed
                iaculis aliquam. In elementum ante erat. Vivamus venenatis
                eleifend iaculis. Nulla euismod porta faucibus. Mauris ornare mi
                arcu, id tincidunt magna imperdiet vitae. In suscipit facilisis
                neque, eget porttitor est rutrum in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeReviewScreen;
