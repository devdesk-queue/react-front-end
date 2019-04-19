import axios from 'axios';

export const REGISTER_ACCOUNT_INIT = 'REGISTER_ACCOUNT_INIT';
export const REGISTER_ACCOUNT_SUCCESS = 'REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_ERROR = 'REGISTER_ACCOUNT_ERROR';

export const register = data => dispatch => {
    dispatch({
        type: REGISTER_ACCOUNT_INIT
    });
    return axios.post('https://devdeskqueue.herokuapp.com/api/auth/register', data)
        .then(response => {
            //Set user token
            localStorage.setItem('token', response.data.token);
            //Dispatch success action
            dispatch({
                type: REGISTER_ACCOUNT_SUCCESS,
                payload: response.data.user
            });
            return true;
        })
        .catch(error => {
            dispatch({
                type: REGISTER_ACCOUNT_ERROR,
                payload: error.response.data.message
            });
        });
}
