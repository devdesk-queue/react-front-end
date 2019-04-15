import axios from 'axios';

export const REGISTER_INIT = 'REGISTER_INIT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const register = data => dispatch => {
    dispatch({
        type: REGISTER_INIT
    });
    axios.get('register', data)
        .then(response => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.data
            });
        });
}