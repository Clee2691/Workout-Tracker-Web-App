import React from 'react';
import NavigationBar from '../NavigationBar';

const HomeScreen = () => {
    return (
        <>
            <NavigationBar/>
            <div className="banner-logo">
                <div className="background-banner"/>
                <h1 className="home-heading text-center">SwoleMate's Workout Log</h1>
            </div>
            
            <div class="container">
                <h1>Recent User Workouts</h1>
            </div>
            
        
        </>
    )
}

export default HomeScreen;