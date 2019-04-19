import {
    DELETE_USERS_SUCCESS
} from '../actions/users/delete';
import {
    UPDATE_USERS_SUCCESS
} from '../actions/users/update';
import {
    VIEWALL_USERS_SUCCESS
} from '../actions/users/viewAll';

const initState = {
    error: null,
    loading: false,
    users: []
}

export const users = (state = initState, action) => {

    //If it's an users action
    if (action.type.includes('USERS')) {

        //Store the original action type
        const originalActionType = action.type;
        //Get the lifecycle of action (init, success, or error)
        action.type = action.type.slice(action.type.lastIndexOf('_') + 1);

        //Update state based  the lifecycle of the action
        switch (action.type) {
            case 'INIT':
                return {
                    error: null,
                    loading: true,
                    users: [...state.users]
                }
            case 'SUCCESS':
                //Update tickets array based on which action was successful
                switch (originalActionType) {
                    case UPDATE_USERS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            users: state.users.map(user => {
                                if (user.id === action.payload.id) {
                                    return action.payload;
                                } else return user;
                            })
                        }
                    case VIEWALL_USERS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            users: [...action.payload]
                        }
                    case DELETE_USERS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            users: state.users.filter(user => {
                                return user.id !== action.payload;
                            })
                        }
                    default:
                        return state;
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false,
                    users: [...state.users]
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}
