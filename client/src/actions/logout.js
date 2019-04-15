import axios from 'axios';

export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const logout = data => dispatch => {
    dispatch({
        type: LOGOUT_INIT
    });
    axios.post('logoutAPIpath', data)
        .then(_ => {
            localStorage.setItem('token', null);
            dispatch({
                type: LOGOUT_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_ERROR,
                payload: error.data
            });
        });
}