import {LOGIN_USER, REGISTER_USER, CHECK_USER, UPDATE_USER, Find_USER, BOARD, REPLY} from "./tyeps";
import {request} from "../utils/axios";

const USER_URL = "/users";
const back = "/back";

export function registerUser(dataToSubmit){
    const data = request("post", back+USER_URL + "/register", dataToSubmit);

    return{
        type: REGISTER_USER,
        payload: data,
    };
}

export function loginUser(dataToSubmit){
    const data = request("post", back+USER_URL+"/login", dataToSubmit);
    return{
        type: LOGIN_USER,
        payload: data,
    };
}

export function checkEmail(dataToSubmit){
    const data = request("post", back+USER_URL+"/check/email", dataToSubmit);
    return{
        type: CHECK_USER,
        payload: data,
    };
}

export function checkNick(dataToSubmit){
    const data = request("post", back+USER_URL+"/check/nickname", dataToSubmit);
    return{
        type: CHECK_USER,
        payload: data,
    };
}

export function findPw(dataToSubmit){
    const data = request("post", back+USER_URL+"/findpw", dataToSubmit);
    return{
        type: Find_USER,
        payload: data,
    };
}

export function modifyAuth(dataToSubmit){
    const data = request("post", back+USER_URL+"/check/password", dataToSubmit);
    return{
        type: CHECK_USER,
        payload: data,
    };
}

export function modify(dataToSubmit){
    const data = request("post", back+"/update", dataToSubmit);
    return{
        type: UPDATE_USER,
        payload: data,
    };
}

export function board(){
    const data = request("get", back+"/board/");
    return{
        type: BOARD,
        payload: data,
    };
}

export function boardWrite(dataToSubmit){
    const data = request("post", back+"/board/write", dataToSubmit);
    return{
        type: BOARD,
        payload: data,
    };
}

export function boardDetail(pno){
    const data = request("get", back+"/board/"+pno);
    return{
        type: BOARD,
        payload: data,
    };
}

export function boardDelete(pno){
    const data = request("delete", back+"/board/delete", pno);
    return{
        type: BOARD,
        payload: data,
    };
}

export function boardModify(pno){
    const data = request("post", back+"/board/modify", pno);
    return{
        type: BOARD,
        payload: data,
    };
}

export function replyWrite(pno){
    const data = request("post", back+"/reply/write", pno);
    return{
        type: REPLY,
        payload: data,
    };
}