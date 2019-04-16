import {
    CREATE_TICKETS_SUCCESS
} from '../actions/tickets/create';
import {
    UPDATE_TICKETS_SUCCESS
} from '../actions/tickets/update';
import {
    VIEWALL_TICKETS_SUCCESS
} from '../actions/tickets/viewAll';

const initState = {
    error: null,
    loading: false,
    tickets: []
}

export const tickets = (state = initState, action) => {

    //If it's a ticket action
    if (action.type.includes('TICKETS')) {
        console.log(action.type)
        const originalActionType = action.type;

        //Get the type of action
        action.type = action.type.slice(action.type.lastIndexOf('_') + 1);

        //Update state
        switch (action.type) {
            case 'INIT':
                return {
                    error: null,
                    loading: true,
                    tickets: [...state.tickets]
                }
            case 'SUCCESS':
                //Update tickets array
                switch (originalActionType) {
                    case CREATE_TICKETS_SUCCESS:
                        return {
                            error: null,
                            loading: true,
                            tickets: [
                                ...state.tickets,
                                action.payload
                            ]
                        }
                    case UPDATE_TICKETS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            tickets: [
                                ...action.payload,
                                action.payload
                            ]
                        }
                    case VIEWALL_TICKETS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            tickets: [
                                ...action.payload
                            ]
                        }
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false,
                    tickets: [...state.tickets]
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}