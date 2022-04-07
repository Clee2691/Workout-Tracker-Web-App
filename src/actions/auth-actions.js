import * as service from "../service/auth-service.js";

export const REGISTER = "REGISTER";
export const LOGINUSER = "LOGIN";
export const LOGOUTUSER = "LOGOUT";

export const RegisterUser = async (dispatch, user) => {
  const newuser = {
    ...user,
    firstName: "",
    lastName: "",
    dateJoined: new Date(),
    sensitiveInfo: {
      dateOfBirth: "",
      phoneNumber: "",
    },
    userStats: {
      weight: 0,
      height: 0,
    },
  };

  const insertedUser = await service.signup(newuser);
  dispatch({
    type: REGISTER,
    insertedUser,
  });
};

export const LoginUser = async (dispatch, user) => {
  const matchedUser = await service.login(user);
  dispatch({
    type: LOGINUSER,
    matchedUser,
  });
};

export const LogoutUser = async (dispatch) => {
  await service.logout();
  dispatch({
    type: LOGOUTUSER
  })
}