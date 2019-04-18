import axios from 'axios';
import {accountInfo} from './info';

export const LOGIN_ACCOUNT_INIT = 'LOGIN_ACCOUNT_INIT';
export const LOGIN_ACCOUNT_SUCCESS = 'LOGIN_ACCOUNT_SUCCESS';
export const LOGIN_ACCOUNT_ERROR = 'LOGIN_ACCOUNT_ERROR';

export const login = data => dispatch => {
    dispatch({
        type: LOGIN_ACCOUNT_INIT
    });
    return axios.post('https://devdeskqueue.herokuapp.com/api/auth/login', data)
        .then(response => {
            //Set user token
            localStorage.setItem('token', response.data.token);
            //Dispatch success action
            dispatch({
                type: LOGIN_ACCOUNT_SUCCESS,
                payload: response.data.user
            });
            return true;
        })
        .catch(error => {
            dispatch({
                type: LOGIN_ACCOUNT_ERROR,
                payload: error.message
            });
        });
}