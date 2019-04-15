import axios from 'axios';

export const LOGOUT_INIT = 'LOGOUT_INIT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const logout = data => dispatch => {
    dispatch({
        type: LOGOUT_INIT
    });
    axios.get('logout', data)
        .then(response => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_ERROR,
                payload: error.data
            });
        });
}