import { Link } from "react-router-dom";
const WorkoutPlanCard = ({workout}) => {
    return (
      <div key={workout._id}>
        <div className="card bg-info mb-2 border ms-4 me-4">
          <div className="row g-0">
            <div className="col-md-5 col-lg-4 d-flex align-self-center justify-content-center">
              <img
                className="img-fluid rounded-circle p-2 w-75"
                src="../images/workout/workoutplan.jpg"
              ></img>
            </div>
            <div className="col-md d-flex">
              <div className="card-body text-center p-1 mt-2 mb-2">
                <h3 className="card-title">{workout.name}</h3>
                <div>
                  Plan created by:{" "}
                  <Link
                    to={`/profile/${workout.trainerId}`}
                    className="text-decoration-none text-dark"
                  >
                    {workout.trainerName}
                  </Link>
                </div>
                <hr className="ms-4 me-4"></hr>
                {workout.exercises.map((exercise) => {
                  return (
                    <p className="fs-6 card-text" key={exercise._id}>
                      Exercise: {exercise.exName} | Sets: {exercise.exNumSets} x
                      Reps: {exercise.exNumReps}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default WorkoutPlanCard;