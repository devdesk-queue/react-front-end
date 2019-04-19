import {axiosWithAuth} from '../../utility/auth';

export const DELETE_USERS_INIT = 'DELETE_USERS_INIT';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USERS_ERROR = 'DELETE_USERS_ERROR';

export const deleteUser = id => dispatch => {
    dispatch({
        type: DELETE_USERS_INIT
    });
    return axiosWithAuth()
        .delete(`https://devdeskqueue.herokuapp.com/api/users/${id}`)
        .then(response => {
            dispatch({
                type: DELETE_USERS_SUCCESS,
                payload: Number(response.data.id)
            });
        })
        .catch(error => {
            dispatch({
                type: DELETE_USERS_ERROR,
                payload: error.response.data.message
            });
        });
}
