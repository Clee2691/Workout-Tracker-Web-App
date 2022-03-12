import React from 'react';

const ProfileWorkouts = () => {
    return(
        <div>
            <h1 className='mt-2'>Workouts</h1>

            <div className='card bg-primary mb-2'>
                <div className='row g-0'>
                    <div className='col-md-5 col-lg-4'>
                        <img className='img-fluid rounded-start' src='../images/avatars/profilemale1.jpg'></img>
                    </div>
                    <div className='col-md d-flex'>
                        <div className='card-body align-self-center text-center'>
                            <h4 className='card-title'>01/01/2022</h4>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card bg-primary mb-2'>
                <div className='row g-0'>
                    <div className='col-md-5 col-lg-4'>
                        <img className='img-fluid rounded-start' src='../images/avatars/maleprof2.jpg'></img>
                    </div>
                    <div className='col-md d-flex'>
                        <div className='card-body align-self-center text-center'>
                            <h4 className='card-title'>Workout 2</h4>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                            <p className='card-text'>Set 1: 5 reps 135lbs</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileWorkouts;