import {axiosWithAuth} from '../../utility/auth';

export const DELETE_CATEGORIES_INIT = 'DELETE_CATEGORIES_INIT';
export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';
export const DELETE_CATEGORIES_ERROR = 'DELETE_CATEGORIES_ERROR';

export const deleteCategory = id => dispatch => {
    dispatch({
        type: DELETE_CATEGORIES_INIT
    });
    axiosWithAuth()
        .delete(`https://devdeskqueue.herokuapp.com/api/categories/${id}`)
        .then(response => {
            dispatch({
                type: DELETE_CATEGORIES_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: DELETE_CATEGORIES_ERROR,
                payload: error.message
            });
        });
}