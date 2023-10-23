// import { combineReducers } from "redux";

const singleClient = (state = {}, action) => {
    if (action.type === 'SET_SINGLE_CLIENT') {
        return action.payload;
    }
    return state;
}

export default singleClient;