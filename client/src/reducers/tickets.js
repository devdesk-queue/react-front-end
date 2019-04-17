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
                    tickets: [...state.tickets]
                }
            case 'SUCCESS':

                //Update tickets array based on which action was successful
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
                                state.tickets.map(ticket => {
                                    if (ticket.id === action.payload.id) {
                                        return action.payload;
                                    } else return ticket;
                                })
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