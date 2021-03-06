import {axiosWithAuth} from '../../utility/auth';

export const CREATE_CATEGORIES_INIT = 'CREATE_CATEGORIES_INIT';
export const CREATE_CATEGORIES_SUCCESS = 'CREATE_CATEGORIES_SUCCESS';
export const CREATE_CATEGORIES_ERROR = 'CREATE_CATEGORIES_ERROR';

export const createCategory = newCategory => dispatch => {
    dispatch({
        type: CREATE_CATEGORIES_INIT
    });
    return axiosWithAuth()
        .post('https://devdeskqueue.herokuapp.com/api/categories', newCategory)
        .then(response => {
            dispatch({
                type: CREATE_CATEGORIES_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_CATEGORIES_ERROR,
                payload: error.response.data.message
            });
        });
}
