import axios from 'axios';

export const LOGIN_ACCOUNT_INIT = 'LOGIN_ACCOUNT_INIT';
export const LOGIN_ACCOUNT_SUCCESS = 'LOGIN_ACCOUNT_SUCCESS';
export const LOGIN_ACCOUNT_ERROR = 'LOGIN_ACCOUNT_ERROR';

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_ACCOUNT_INIT
    });
    axios.post('https://devdeskqueue.herokuapp.com/api/auth/login', data)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            console.log(response)
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