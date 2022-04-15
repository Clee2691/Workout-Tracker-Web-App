import * as userService from "../service/user-service";
import * as authService from "../service/auth-service";

export const UPDATE_USER = "UPDATE_USER";
export const GET_LOGGED_USER = "GET_LOGGED_USER";

export const UpdateUser = async (dispatch, newUser) => {
    await userService.updateUser(newUser);
    dispatch({
        type: UPDATE_USER,
        newUser
    })
}

export const GetUser = async (dispatch) => {
    const foundUser = await authService.profile();
    dispatch({
        type: GET_LOGGED_USER,
        foundUser
    })
}

export const GetAllUsers = async () => {
    const allUsers = await userService.findAllUsers();
    return allUsers;
}

export const GetUserByID = async (uid) => {
  const foundUser = await userService.findUserById(uid);
  return foundUser;
};