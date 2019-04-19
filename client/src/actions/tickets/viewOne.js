import {axiosWithAuth} from '../../utility/auth';

export const VIEWONE_TICKETS_INIT = 'VIEWONE_TICKETS_INIT';
export const VIEWONE_TICKETS_SUCCESS = 'VIEWONE_TICKETS_SUCCESS';
export const VIEWONE_TICKETS_ERROR = 'VIEWONE_TICKETS_ERROR';

export const viewOneTicket = id => dispatch => {
    dispatch({
        type: VIEWONE_TICKETS_INIT
    });
    axiosWithAuth()
        .get(`https://devdeskqueue.herokuapp.com/api/tickets/${id}`)
        .then(response => {
            dispatch({
                type: VIEWONE_TICKETS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: VIEWONE_TICKETS_ERROR,
                payload: error.message
            });
        });
}