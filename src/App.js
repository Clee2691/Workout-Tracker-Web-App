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

// Reducer
import searchPageReducer from "./reducers/searchReducer";
import workoutLogReducer from "./reducers/workoutLogReducer";
import WorkoutLog from "./components/WorkoutLog";
import userReducer from "./reducers/userReducer";
import reviewReducer from "./reducers/reviewReducer";

const reducers = combineReducers({
  searchPageReducer,
  workoutLogReducer,
  userReducer,
  reviewReducer
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
          {/* Search page routes */}
          <Route path="/search" exact={true} element={<RecipeSearch />} />
          <Route path="/search/:criteria" element={<SearchResults />} />
          <Route path="/details/:id" element={<ItemDetails />} />

          <Route path="/profile" exact={true} element={<ProfileScreen />} />
          <Route path="/profile/:uid" />

          <Route path="/workout-log" element={<WorkoutLog/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
