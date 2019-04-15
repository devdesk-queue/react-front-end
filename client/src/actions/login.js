import axios from 'axios';

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_INIT
    });
    axios.post('loginAPIpath', data)
        .then(response => {
            localStorage.setItem('token', response.data);
            dispatch({
                type: LOGIN_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.data
            });
        });
}