import axios from 'axios';

export const LOGIN_INIT = 'LOGIN_INIT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_INIT
    });
    axios.get('login', data)
        .then(response => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.data
            });
        });
}