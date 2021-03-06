import {axiosWithAuth} from '../../utility/auth';

export const DELETE_CATEGORIES_INIT = 'DELETE_CATEGORIES_INIT';
export const DELETE_CATEGORIES_SUCCESS = 'DELETE_CATEGORIES_SUCCESS';
export const DELETE_CATEGORIES_ERROR = 'DELETE_CATEGORIES_ERROR';

export const deleteCategory = id => dispatch => {
    dispatch({
        type: DELETE_CATEGORIES_INIT
    });
    return axiosWithAuth()
        .delete(`https://devdeskqueue.herokuapp.com/api/categories/${id}`)
        .then(response => {
            dispatch({
                type: DELETE_CATEGORIES_SUCCESS,
                payload: Number(response.data.id)
            });
        })
        .catch(error => {
            dispatch({
                type: DELETE_CATEGORIES_ERROR,
                payload: error.response.data.message
            });
        });
}
