import {axiosWithAuth} from '../../utility/auth';

export const VIEWALL_USERS_INIT = 'VIEWALL_USERS_INIT';
export const VIEWALL_USERS_SUCCESS = 'VIEWALL_USERS_SUCCESS';
export const VIEWALL_USERS_ERROR = 'VIEWALL_USERS_ERROR';

export const viewAllUsers = _ => dispatch => {
    dispatch({
        type: VIEWALL_USERS_INIT
    });
    return axiosWithAuth()
        .get('https://devdeskqueue.herokuapp.com/api/users')
        .then(response => {
            dispatch({
                type: VIEWALL_USERS_SUCCESS,
                payload: response.data
            });
            return response.data;
        })
        .catch(error => {
            dispatch({
                type: VIEWALL_USERS_ERROR,
                payload: error.message
            });
        });
}