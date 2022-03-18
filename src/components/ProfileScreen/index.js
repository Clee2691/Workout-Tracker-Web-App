import React from 'react';
import NavigationBar from '../NavigationBar';
import RegisterScreen from '../RegisterScreen';
import ProfileInfo from './ProfileInfo';
import ProfileWorkouts from './ProfileWorkouts';
import ProfileFollow from './ProfileFollow';
import EditProfile from './EditProfile';
import RecipeReviewScreen from '../RecipeReviewScreen';

const ProfileScreen = () => {
    const loggedIn = true;
    const isEditing = false;
    const currScreen = "RECIPEREV";
    if (loggedIn) {
        if (!isEditing) {
            return(
                <>
                    <NavigationBar currScreen={"PROFILE"}/>
                    <div className='container row mt-4 ms-auto me-auto'>
                        <ProfileInfo/>
    
                        <div className='col'>
                            <ul className='nav nav-tabs'>
                                <li className='nav-item'>
                                    <a className={`nav-link ${currScreen === 'WORKOUTS' ? 'active' : ''} `} href='#'>Your Workouts</a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${currScreen === 'RECIPEREV' ? 'active' : ''}`} href='#'>Your Recipe Reviews</a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${currScreen === 'FOLLOW' ? 'active' : ''}`} href='#'>Your Friends</a>
                                </li>
                            </ul>
                            {
                                currScreen === 'WORKOUTS' && <ProfileWorkouts/>
                            }
                            {
                                currScreen === 'RECIPEREV' && <RecipeReviewScreen profileScreen = {true}/>
                            }
                            {
                                currScreen === 'FOLLOW' && <ProfileFollow/>
                            }
                        </div>
    
                    </div>
                </>
            )
        } else {
            return(
                <EditProfile/>
            )
        }
        
    } else {
        return(<RegisterScreen/>)
    }

}

export default ProfileScreen;