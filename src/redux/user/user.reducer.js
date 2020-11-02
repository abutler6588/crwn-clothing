import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    //depending on what the action is
    switch (action.type) {
        //check if case if equal to set current user
        case UserActionTypes.SET_CURRENT_USER:
            //return new object
            return {
                ...state,
                currentUser: action.payload
            };
            //if nothing matches return default 
        default:
            return state;
    }
};

export default userReducer;