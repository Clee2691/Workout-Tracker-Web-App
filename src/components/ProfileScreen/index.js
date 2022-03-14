import React from 'react';
import NavigationBar from '../NavigationBar';
import RegisterScreen from '../RegisterScreen';
import ProfileInfo from './ProfileInfo';
import ProfileWorkouts from './ProfileWorkouts';
import ProfileBodyStats from './ProfileBodyStats';
import ProfileFollow from './ProfileFollow';
import EditProfile from './EditProfile';

const ProfileScreen = () => {
    const loggedIn = true;
    const isEditing = false;
    const currScreen = "WORKOUTS";
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
                                    <a className={`nav-link ${currScreen === 'WORKOUTS' ? 'active' : ''} `} href='#'>WORKOUTS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${currScreen === 'STATS' ? 'active' : ''}`} href='#'>STATS</a>
                                </li>
                                <li className='nav-item'>
                                    <a className={`nav-link ${currScreen === 'FOLLOW' ? 'active' : ''}`} href='#'>CONNECTIONS</a>
                                </li>
                            </ul>
                            {
                                currScreen === 'WORKOUTS' && <ProfileWorkouts/>
                            }
                            {
                                currScreen === 'STATS' && <ProfileBodyStats/>
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