import {axiosWithAuth} from '../../utility/auth';

export const UPDATE_TICKETS_INIT = 'UPDATE_TICKETS_INIT';
export const UPDATE_TICKETS_SUCCESS = 'UPDATE_TICKETS_SUCCESS';
export const UPDATE_TICKETS_ERROR = 'UPDATE_TICKETS_ERROR';

export const update = id => data => dispatch => {
    dispatch({
        type: UPDATE_TICKETS_INIT
    });
    axiosWithAuth()
        .put(`https://devdeskqueue.herokuapp.com/api/tickets/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_TICKETS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_TICKETS_ERROR,
                payload: error.message
            });
        });
}