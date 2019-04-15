import {
    axiosWithAuth
} from '../../utility/auth';

export const VIEW_INIT = 'VIEW_INIT';
export const VIEW_SUCCESS = 'VIEW_SUCCESS';
export const VIEW_ERROR = 'VIEW_ERROR';

export const view = _ => dispatch => {
    dispatch({
        type: VIEW_INIT
    });
    axiosWithAuth.get('http://localhost:5000/api/tickets')
        .then(response => {
            dispatch({
                type: VIEW_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: VIEW_ERROR,
                payload: error.data
            });
        });
}