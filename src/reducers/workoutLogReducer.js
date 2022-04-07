const workoutLogReducer = (state = [], action) => {
  switch (action.type) {
    case "add-workout":
        const newWorkouts =[
            ...state,
            action.combInfo
        ]
      return newWorkouts;

    default:
      return state;
  }
};

export default workoutLogReducer;
