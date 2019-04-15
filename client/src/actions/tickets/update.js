import {
    axiosWithAuth
} from '../../utility/auth';

export const UPDATE_INIT = 'UPDATE_INIT';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const update = id => data => dispatch => {
    dispatch({
        type: UPDATE_INIT
    });
    axiosWithAuth.put(`http://localhost:5000/api/tickets/${id}`, data)
        .then(response => {
            dispatch({
                type: UPDATE_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_ERROR,
                payload: error.data
            });
        });
}