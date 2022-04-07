import { LOGOUTUSER, REGISTER } from "../actions/auth-actions";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER:
      return action.insertedUser;

    case LOGOUTUSER:
      return {};

    default:
      return state;
  }
};

export default userReducer;
