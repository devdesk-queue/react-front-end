import {
    axiosWithAuth
} from '../../utility/auth';

export const CREATE_INIT = 'CREATE_INIT';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_ERROR = 'CREATE_ERROR';

export const create = data => dispatch => {
    dispatch({
        type: CREATE_INIT
    });
    axiosWithAuth.post('http://localhost:5000/api/tickets', data)
        .then(response => {
            dispatch({
                type: CREATE_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_ERROR,
                payload: error.data
            });
        });
}