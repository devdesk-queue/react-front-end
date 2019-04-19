import {axiosWithAuth} from '../../utility/auth';

export const VIEWALL_ROLES_INIT = 'VIEWALL_ROLES_INIT';
export const VIEWALL_ROLES_SUCCESS = 'VIEWALL_ROLES_SUCCESS';
export const VIEWALL_ROLES_ERROR = 'VIEWALL_ROLES_ERROR';

export const viewAllRoles = _ => dispatch => {
    dispatch({
        type: VIEWALL_ROLES_INIT
    });
    return axiosWithAuth()
        .get('https://devdeskqueue.herokuapp.com/api/roles')
        .then(response => {
            dispatch({
                type: VIEWALL_ROLES_SUCCESS,
                payload: response.data
            });
            return response.data;
        })
        .catch(error => {
            dispatch({
                type: VIEWALL_ROLES_ERROR,
                payload: error.response.data.message
            });
        });
}
