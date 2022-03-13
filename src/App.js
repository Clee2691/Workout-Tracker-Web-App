import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './vendor/bootswatch/bootstrap.min.css';
import './components/HomeScreen/home.css'
import './components/ProfileScreen/profile.css';

import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import RecipeSearch from "./components/RecipeSearch";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<HomeScreen />} />
          <Route path="/home" exact={true} element={<HomeScreen />} />
          <Route path="/login" exact={true} element={<LoginScreen/>}/>
          <Route path="/register" exact={true} element={<RegisterScreen/>}/>
          <Route path="/search" exact={true} element={<RecipeSearch/>}/>
          <Route path="/details" exact={true} />
          <Route path="/users" exact={true} />
          <Route path='/profile' exact={true} element={<ProfileScreen/>}/>
        </Routes>
    </BrowserRouter>

  );
}

export default App;
