import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import "./vendor/bootswatch/bootstrap.min.css";
import "./components/HomeScreen/home.css";
import "./components/ProfileScreen/profile.css";

// The screens
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import RecipeSearch from "./components/RecipeSearch";
import ItemDetails from "./components/RecipeSearch/ItemDetails";
import SearchResults from "./components/RecipeSearch/SearchResults";
import AllRecipeReviewScreen from "./components/AllRecipeReviewScreen";
import AllUserScreen from "./components/AllUserScreen";
import PublicProf from "./components/PublicUserScreen";
import WorkoutPlanScreen from "./components/WorkoutPlanScreen";
import WorkoutLog from "./components/WorkoutLog";
import MealPlanScreen from "./components/MealPlanScreen";

// Reducer
import searchPageReducer from "./reducers/searchReducer";
import workoutLogReducer from "./reducers/workoutLogReducer";
import userReducer from "./reducers/userReducer";
import reviewReducer from "./reducers/reviewReducer";
import workoutPlanReducer from "./reducers/workoutPlanReducer";
import mealPlanReducer from "./reducers/mealPlanReducer";

const reducers = combineReducers({
  searchPageReducer,
  workoutLogReducer,
  userReducer,
  reviewReducer,
  workoutPlanReducer,
  mealPlanReducer,
});

const store = createStore(reducers);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<HomeScreen />} />
          <Route path="/home" exact={true} element={<HomeScreen />} />
          <Route path="/login" exact={true} element={<LoginScreen />} />
          <Route path="/register" exact={true} element={<RegisterScreen />} />

          <Route path="/search" exact={true} element={<RecipeSearch />} />
          <Route path="/search/:criteria" element={<SearchResults />} />
          <Route path="/details/:id" element={<ItemDetails />} />
          <Route path="/recipe-reviews" element={<AllRecipeReviewScreen />} />

          <Route path="/users" element={<AllUserScreen />} />
          <Route path="/profile/:uid" element={<PublicProf />} />
          <Route path="/profile" element={<ProfileScreen />} />

          <Route path="/workout-log" element={<WorkoutLog />} />
          <Route path="/workoutplans" element={<WorkoutPlanScreen />} />

          <Route path="/mealplans" element={<MealPlanScreen />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
