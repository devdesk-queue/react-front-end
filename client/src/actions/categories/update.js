import {axiosWithAuth} from '../../utility/auth';

export const UPDATE_CATEGORIES_INIT = 'UPDATE_CATEGORIES_INIT';
export const UPDATE_CATEGORIES_SUCCESS = 'UPDATE_CATEGORIES_SUCCESS';
export const UPDATE_CATEGORIES_ERROR = 'UPDATE_CATEGORIES_ERROR';

export const updateCategory = data => dispatch => {
    dispatch({
        type: UPDATE_CATEGORIES_INIT
    });
    return axiosWithAuth()
        .put(`https://devdeskqueue.herokuapp.com/api/categories/${data.id}`, {name: data.name})
        .then(response => {
            dispatch({
                type: UPDATE_CATEGORIES_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: UPDATE_CATEGORIES_ERROR,
                payload: error.response.data.message
            });
        });
}
