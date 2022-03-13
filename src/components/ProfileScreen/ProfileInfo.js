import React from 'react';

const ProfileInfo = () => {
    return (
        <div className='col-sm-4 col-lg-4'>
            <div className='card bg-transparent'>
                <img className='rounded-circle p-3 img-fluid' 
                    src='../images/avatars/profilemale1.jpg'></img>
                <div className='card-body'>
                    <h3 className='card-title text-center'>Calvin Lee</h3>
                    <p className='card-subtitle text-muted text-center'>Occupation: Student</p>
                    <div className='d-flex justify-content-center flex-wrap'>
                        <p className='me-2'>Followers: 300</p>
                        <p>Following: 100</p>
                    </div>
                    
                    <p className='card-text lead'>Some bio that I can use to display.</p>
                    <p className='card-text'>Age: 30</p>
                    <p className='card-text'>Location: Boston</p>
                    <p className='card-text'>Email: someone@gmail.com</p>
                    <p className='card-text'>Phone: 1800DONTTEXT</p>
                </div>
                <div className='card-footer bg-transparent text-center'>
                    <button className='btn btn-danger'><i className="fa-solid fa-pen-to-square"></i> Edit Profile</button>
                </div>
                
            </div>
        </div>
    )
}

export default ProfileInfo;