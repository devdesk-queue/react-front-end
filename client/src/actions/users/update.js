import {axiosWithAuth} from '../../utility/auth';

export const UPDATE_USERS_INIT = 'UPDATE_USERS_INIT';
export const UPDATE_USERS_SUCCESS = 'UPDATE_USERS_SUCCESS';
export const UPDATE_USERS_ERROR = 'UPDATE_USERS_ERROR';

export const updateUser = id => dispatch => {
    dispatch({
        type: UPDATE_USERS_INIT
    });
    axiosWithAuth()
        .put(`https://devdeskqueue.herokuapp.com/api/users/${id}`)
        .then(response => {
            dispatch({
                type: UPDATE_USERS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_USERS_ERROR,
                payload: error.message
            });
        });
}