import { LOGINUSER, LOGOUTUSER, REGISTER } from "../actions/auth-actions";
import { UPDATE_USER, GET_LOGGED_USER } from "../actions/user-actions";

const initialState = { sensitiveInfo: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGED_USER:
      console.log("Getting logged user");
      console.log(action.foundUser);
      return action.foundUser;

    case LOGINUSER:
     console.log("Logging in");
     console.log(action.matchedUser);
      return action.matchedUser;

    case UPDATE_USER:
      console.log("update user");
      return { ...state, ...action.newUser };

    case REGISTER:
      console.log("register");
      return action.insertedUser;

    case LOGOUTUSER:
      console.log("logout");
      localStorage.clear();
      return initialState;

    default:
      console.log("default state");
      return state;
  }
};

export default userReducer;
