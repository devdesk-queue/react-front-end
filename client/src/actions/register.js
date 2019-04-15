import axios from 'axios';

export const REGISTER_INIT = 'REGISTER_INIT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const register = data => dispatch => {
    dispatch({
        type: REGISTER_INIT
    });
    axios.put('registerAPIpath', data)
        .then(response => {
            localStorage.setItem('token', response.data);
            dispatch({
                type: REGISTER_SUCCESS
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.data
            });
        });
}