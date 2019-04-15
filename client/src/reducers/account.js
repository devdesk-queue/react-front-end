const initState = {
    error: null,
    loading: false
}

export const reducer = (state = initState, action) => {
    action.type.slice(action.type.indexOf('_') + 1);
    switch (action.type) {
        case 'INIT':
            return {
                error: null,
                loading: true
            }
        case 'SUCCESS':
            return {
                error: null,
                loading: false
            }
        case 'ERROR':
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}