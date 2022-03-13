import React from 'react';
import { Link } from 'react-router-dom';

import NavigationBar from '../NavigationBar';

const RegisterScreen = () => {
    return (
        <>
            <NavigationBar />

            <div className='container col-sm-9 col-md-7 col-lg-6 col-xl-5 mt-4 border p-4 border-secondary'>
                <h1 className='text-center'>Sign Up</h1>
                <form className='ps-3 pe-3'>
                        <div className='mt-2'>
                            <label className='form-label' htmlFor='username-input'>Username</label>
                            <input className='form-control' type='text' id='username-input' placeholder='Username...' />
                        </div>

                        <div className='mt-2'>
                            <label className='form-label' htmlFor='email-input'>Email</label>
                            <input className='form-control' type='email' id='email-input' placeholder='Email...' />
                        </div>

                        <div className='mt-2 mb-2'>
                            <label className='form-label' htmlFor='password-input'>Password</label>
                            <input className='form-control' type='password' id='password-input' placeholder='Password...' />
                        </div>
                        <div className='mt-2 mb-2'>
                            <label className='form-label' htmlFor='confirm-pw-input'>Confirm Password</label>
                            <input className='form-control' type='password' id='confirm-pw-input' placeholder='Confirm Password...' />
                        </div>

                        <div className='text-danger small ms-2 me-2'>
                            <p className='mb-1 lead'>Password Requirements:</p>
                            <div className='d-flex justify-content-between'>
                                <p className='mb-1'>Minimum 8 Characters</p>
                                <p className='mb-1'>1 number (0-9)</p>
                                
                            </div>
                            <div className='d-flex justify-content-between'>
                                <p className='mb-1'>1 lowercase letter (a-z)</p>
                                <p className='mb-1'>1 uppercase letter (A-Z)</p>
                            </div>
                            <div>
                                <p className='mb-1'>1 special character (!@#$%^*())</p>
                            </div>
                        </div>
                        
                        <div className='d-grid'>
                            <button type='submit' className='btn btn-primary mt-2'>Register</button>
                        </div>
                </form>
                <label className='mt-2 ms-3'>Already registered?</label> <Link to='/login' className='mt-0 text-decoration-none'>Login Here!</Link>
            </div>
        </>

    )
}

export default RegisterScreen;