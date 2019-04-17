import {axiosWithAuth} from '../../utility/auth';

export const VIEWALL_CATEGORIES_INIT = 'VIEWALL_CATEGORIES_INIT';
export const VIEWALL_CATEGORIES_SUCCESS = 'VIEWALL_CATEGORIES_SUCCESS';
export const VIEWALL_CATEGORIES_ERROR = 'VIEWALL_CATEGORIES_ERROR';

export const viewAllCategories = _ => dispatch => {
    dispatch({
        type: VIEWALL_CATEGORIES_INIT
    });
    axiosWithAuth()
        .get('https://devdeskqueue-lite.herokuapp.com/api/categories')
        .then(response => {
            dispatch({
                type: VIEWALL_CATEGORIES_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: VIEWALL_CATEGORIES_ERROR,
                payload: error.message
            });
        });
}