import {axiosWithAuth} from '../../utility/auth';

export const CREATE_TICKETS_INIT = 'CREATE_TICKETS_INIT';
export const CREATE_TICKETS_SUCCESS = 'CREATE_TICKETS_SUCCESS';
export const CREATE_TICKETS_ERROR = 'CREATE_TICKETS_ERROR';

export const create = data => dispatch => {
    console.log(data)
    dispatch({type: CREATE_TICKETS_INIT});
    axiosWithAuth()
        .post('https://devdeskqueue-lite.herokuapp.com/api/tickets', data)
        .then(response => {
            console.log(response);
            dispatch({type: CREATE_TICKETS_SUCCESS, payload: response.data});
        })
        .catch(error => {
            console.log(error)
            dispatch({type: CREATE_TICKETS_ERROR, payload: error.message});
        });
}