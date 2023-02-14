import {LOGIN_USER, REGISTER_USER} from "./tyeps";
import {request} from "../utils/axios";

const USER_URL = "/users";

export function registerUser(dataToSubmit){
    const data = request("post", USER_URL + "/register", dataToSubmit);

    return{
        type: REGISTER_USER,
        payload: data,
    };
}

export function loginUser(dataToSubmit){
    const data = request("post", USER_URL+"/login", dataToSubmit);
    return{
        type: LOGIN_USER,
        payload: data,
    };
}