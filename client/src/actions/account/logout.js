export const LOGOUT_ACCOUNT_INIT = 'LOGOUT_ACCOUNT_INIT';
export const LOGOUT_ACCOUNT_SUCCESS = 'LOGOUT_ACCOUNT_SUCCESS';
export const LOGOUT_ACCOUNT_ERROR = 'LOGOUT_ACCOUNT_ERROR';

export const logout = data => dispatch => {

    dispatch({
        type: LOGOUT_ACCOUNT_INIT
    });

    try {

        localStorage.setItem('token', null);

        dispatch({
            type: LOGOUT_ACCOUNT_SUCCESS
        });

    } catch (error) {

        dispatch({
            type: LOGOUT_ACCOUNT_ERROR,
            payload: error.data
        });

    }
}