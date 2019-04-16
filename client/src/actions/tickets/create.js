import axios from 'axios';

export const CREATE_TICKETS_INIT = 'CREATE_TICKETS_INIT';
export const CREATE_TICKETS_SUCCESS = 'CREATE_TICKETS_SUCCESS';
export const CREATE_TICKETS_ERROR = 'CREATE_TICKETS_ERROR';

export const create = data => dispatch => {
    console.log(data)
    dispatch({
        type: CREATE_TICKETS_INIT
    });
    axios.post('https://devdeskqueue.herokuapp.com/api/tickets', data)
        .then(response => {
            dispatch({
                type: CREATE_TICKETS_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_TICKETS_ERROR,
                payload: error.message
            });
        });
}