import {REGISTER_USER} from "../_actions/tyeps";
import {LOGIN_USER} from "../_actions/tyeps";

export default function (state = {}, action){
    switch(action.type){
        case REGISTER_USER:
            return{...state, Success: action.payload};
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        default:
            return state;
    }
}