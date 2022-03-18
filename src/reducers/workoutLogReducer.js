const initialData = []

const workoutLogReducer = (state = initialData, action) => {
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
