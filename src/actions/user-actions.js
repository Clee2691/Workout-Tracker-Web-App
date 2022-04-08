import * as service from "../service/user-service";
import * as authService from "../service/auth-service";

export const UPDATE_USER = "UPDATE_USER";
export const GET_LOGGED_USER = "GET_LOGGED_USER";

export const UpdateUser = async (dispatch, newUser) => {
    await service.updateUser(newUser);
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