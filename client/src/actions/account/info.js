import {axiosWithAuth} from '../../utility/auth';

export const INFO_ACCOUNT_INIT = 'INFO_ACCOUNT_INIT';
export const INFO_ACCOUNT_SUCCESS = 'INFO_ACCOUNT_SUCCESS';
export const INFO_ACCOUNT_ERROR = 'INFO_ACCOUNT_ERROR';

export const accountInfo = id => dispatch => {
    dispatch({
        type: INFO_ACCOUNT_INIT
    });
    return axiosWithAuth()
        .get(`https://devdeskqueue.herokuapp.com/api/users/${id}`)
        .then(response => {
            dispatch({
                type: INFO_ACCOUNT_SUCCESS,
                payload: response.data
            });
            return true;
        })
        .catch(error => {
            dispatch({
                type: INFO_ACCOUNT_ERROR,
                payload: error.response.data.message
            });
        });
}
