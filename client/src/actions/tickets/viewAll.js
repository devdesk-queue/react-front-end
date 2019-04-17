import axios from 'axios';

export const VIEWALL_TICKETS_INIT = 'VIEWALL_TICKETS_INIT';
export const VIEWALL_TICKETS_SUCCESS = 'VIEWALL_TICKETS_SUCCESS';
export const VIEWALL_TICKETS_ERROR = 'VIEWALL_TICKETS_ERROR';

export const viewAll = _ => dispatch => {
    dispatch({
        type: VIEWALL_TICKETS_INIT
    });
    axios.get('https://devdeskqueue.herokuapp.com/api/tickets')
        .then(response => {
            dispatch({
                type: VIEWALL_TICKETS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: VIEWALL_TICKETS_ERROR,
                payload: error.message
            });
        });
}