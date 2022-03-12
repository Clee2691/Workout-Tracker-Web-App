import React from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from '../NavigationBar';

const LoginScreen = () => {
    return (
        <>
            <NavigationBar />

            <div className='container col-sm-9 col-md-6 col-lg-5 col-xl-4 mt-5 border p-4 border-secondary'>
                <h1 className='text-center'>Login</h1>
                <form className='ps-3 pe-3'>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='username-input'>Username/ Email</label>
                            <input className='form-control' type='text' id='username-input' placeholder='Username/Email...' />
                        </div>

                        <div className='mt-2 mb-2'>
                            <label className='form-label' htmlFor='password-input'>Password</label>
                            <input className='form-control' type='password' id='password-input' placeholder='Password...' />
                        </div>
                        <div className='form-check mb-2 d-flex'>
                            <input type='checkbox' className='form-check-input me-1' id='remember-check'/>
                            <label className='form-check-label me-auto text-muted fw-bold' htmlFor='remember-check'>Remember Me?</label>
                            <Link to='#' className='text-decoration-none' >Forgot Password?</Link>
                        </div>
                        
                        <div class='d-grid'>
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </div>
                </form>
                <label className='mt-2 ms-3'>Need an Account?</label> <Link to='/register' className='mt-0 text-decoration-none'>Signup now!</Link> It's free!
            </div>
        </>

    )
}

export default LoginScreen;