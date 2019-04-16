import axios from 'axios';

export const LOGIN_ACCOUNT_INIT = 'LOGIN_ACCOUNT_INIT';
export const LOGIN_ACCOUNT_SUCCESS = 'LOGIN_ACCOUNT_SUCCESS';
export const LOGIN_ACCOUNT_ERROR = 'LOGIN_ACCOUNT_ERROR';

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_ACCOUNT_INIT
    });
    axios.post('loginAPIpath', data)
        .then(response => {
            localStorage.setItem('token', response.data);
            dispatch({
                type: LOGIN_ACCOUNT_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: LOGIN_ACCOUNT_ERROR,
                payload: error.message
            });
        });
}