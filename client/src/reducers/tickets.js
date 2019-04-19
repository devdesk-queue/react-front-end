import {
    CREATE_TICKETS_SUCCESS
} from '../actions/tickets/create';
import {
    UPDATE_TICKETS_SUCCESS
} from '../actions/tickets/update';
import {
    VIEWALL_TICKETS_SUCCESS
} from '../actions/tickets/viewAll';
import {
    VIEWONE_TICKETS_SUCCESS
} from '../actions/tickets/viewOne';

const initState = {
    error: null,
    loading: false,
    tickets: [],
    ticket: {}
}

export const tickets = (state = initState, action) => {

    //If it's a tickets action
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
                    tickets: [...state.tickets],
                    ticket: {
                        ...state.ticket
                    }
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
                            ],
                            ticket: {
                                ...state.ticket
                            }
                        }
                    case UPDATE_TICKETS_SUCCESS:
                        const newTicket = state.ticket.id === action.payload.id ? action.payload : {
                            ...state.ticket
                        };
                        return {
                            error: null,
                            loading: false,
                            tickets: state.tickets.map(ticket => {
                                if (ticket.id === action.payload.id) {
                                    return action.payload;
                                } else return ticket;
                            }),
                            ticket: newTicket
                        }
                    case VIEWALL_TICKETS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            tickets: [
                                ...action.payload
                            ],
                            ticket: {
                                ...state.ticket
                            }
                        }
                    case VIEWONE_TICKETS_SUCCESS:
                        return {
                            error: null,
                            loading: false,
                            tickets: [
                                ...state.tickets
                            ],
                            ticket: {
                                ...action.payload
                            }
                        }
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false,
                    tickets: [...state.tickets],
                    ticket: {
                        ...state.ticket
                    }
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}