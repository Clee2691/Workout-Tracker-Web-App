import { LOGINUSER, LOGOUTUSER, REGISTER } from "../actions/auth-actions";
import { UPDATE_USER, GET_LOGGED_USER } from "../actions/user-actions";

const initialState = { sensitiveInfo: {} };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGGED_USER:
      return action.foundUser;

    case LOGINUSER:
      return action.matchedUser;

    case UPDATE_USER:
      return { ...state, ...action.newUser };

    case REGISTER:
      return action.insertedUser;

    case LOGOUTUSER:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
