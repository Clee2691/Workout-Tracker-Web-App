import React from 'react';

import NavigationBar from '../NavigationBar';

const EditProfile = () => {
    return (
        <div>
            <NavigationBar/>
            <div className='container border col-sm-8 col-md-6 col-lg-5 col-xl-4 mt-4 mb-4'>
                <h1 className='text-center'>Edit Profile</h1>
                <div className='position-relative'>
                    <img className='img-fluid rounded-circle ms-auto me-auto avatar-pic' src='../images/avatars/profilemale1.jpg'/>
                    <i className="fa-solid fa-camera position-absolute top-50 start-50 translate-middle fs-1"></i>
                </div>
                
                <form className='mt-2 mb-2'>
                    <div className='form-floating mb-2'>
                        <input type='text' className='form-control' id='firstNameInput' placeholder='First Name'/>
                        <label className='form-label' htmlFor='firstNameInput'>First Name</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input type='text' className='form-control' id='lastNameInput' placeholder='Last Name'/>
                        <label className='form-label' htmlFor='lastNameInput'>Last Name</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <input type='text' className='form-control' id='occupationInput' placeholder='Occupation'/>
                        <label className='form-label' htmlFor='occupationInput'>Occupation</label>
                    </div>

                    <div className='form-floating mb-2'>
                        <input type='text' className='form-control' id='locationInput' placeholder='Location'/>
                        <label className='form-label' htmlFor='locationInput'>Location</label>
                    </div>

                    <div className='form-floating mb-2'>
                        <input type='url' className='form-control' id='websiteInput' placeholder='Website'/>
                        <label className='form-label' htmlFor='websiteInput'>Website</label>
                    </div>

                    <div className='form-floating mb-2'>
                        <input type='date' className='form-control' id='dobInput' placeholder='Date of Birth'/>
                        <label className='form-label' htmlFor='dobInput'>Birthday</label>
                    </div>
                    <div className='form-floating mb-2'>
                        <textarea type='text' className='form-control' id='biographyInput'></textarea>
                        <label className='form-label' htmlFor='biographyInput'>Biography</label>
                    </div>

                    <div className='d-flex'>
                        <button className='btn btn-success flex-grow-1 me-2'>Save</button>
                        <button className='btn btn-danger flex-grow-1'>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;