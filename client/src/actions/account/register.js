import axios from 'axios';

export const REGISTER_ACCOUNT_INIT = 'REGISTER_ACCOUNT_INIT';
export const REGISTER_ACCOUNT_SUCCESS = 'REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_ERROR = 'REGISTER_ACCOUNT_ERROR';

export const register = data => dispatch => {
    dispatch({
        type: REGISTER_ACCOUNT_INIT
    });
    return axios.post('https://devdeskqueue-lite.herokuapp.com/api/auth/register', data)
        .then(response => {
            localStorage.setItem('token', response.data.token);
            dispatch({
                type: REGISTER_ACCOUNT_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_ACCOUNT_ERROR,
                payload: error.message
            });
        });
}