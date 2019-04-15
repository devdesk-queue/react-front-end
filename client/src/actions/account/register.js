import axios from 'axios';

export const REGISTER_ACCOUNT_INIT = 'REGISTER_ACCOUNT_INIT';
export const REGISTER_ACCOUNT_SUCCESS = 'REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_ERROR = 'REGISTER_ACCOUNT_ERROR';

export const register = data => dispatch => {
    dispatch({
        type: REGISTER_ACCOUNT_INIT
    });
    axios.put('registerAPIpath', data)
        .then(response => {
            localStorage.setItem('token', response.data);
            dispatch({
                type: REGISTER_ACCOUNT_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_ACCOUNT_ERROR,
                payload: error.data
            });
        });
}