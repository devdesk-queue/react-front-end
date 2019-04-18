import {
    CREATE_CATEGORIES_SUCCESS
} from '../actions/categories/create';
import {
    DELETE_CATEGORIES_SUCCESS
} from '../actions/categories/delete';
import {
    UPDATE_CATEGORIES_SUCCESS
} from '../actions/categories/update';
import {
    VIEWALL_CATEGORIES_SUCCESS
} from '../actions/categories/viewAll';

const initState = {
    error: null,
    loading: false,
    categories: []
}

export const categories = (state = initState, action) => {

    //If it's an categories action
    if (action.type.includes('CATEGORIES')) {

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
                    categories: [...state.categories]
                }
            case 'SUCCESS':
                //Update tickets array based on which action was successful
                switch (originalActionType) {
                    case CREATE_CATEGORIES_SUCCESS:
                        return {
                            error: null,
                            loading: true,
                            categories: [
                                ...state.categories,
                                action.payload
                            ]
                        }
                    case UPDATE_CATEGORIES_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            categories: [
                                state.categories.map(cat => {
                                    if (cat.id === action.payload.id) {
                                        return action.payload;
                                    } else return cat;
                                })
                            ]
                        }
                    case VIEWALL_CATEGORIES_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            categories: [...action.payload]
                        }
                    case DELETE_CATEGORIES_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            categories: [
                                state.categories.filter(cat => cat.id !== action.payload.id)
                            ]
                        }
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false,
                    categories: [...state.categories]
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}