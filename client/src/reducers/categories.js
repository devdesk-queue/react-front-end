const initState = {
    error: null,
    loading: false,
    categories: []
}

export const categories = (state = initState, action) => {

    //If it's an account action
    if (action.type.includes('CATEGORIES')) {

        //Get the type of action
        action.type = action.type.slice(action.type.lastIndexOf('_') + 1);

        //Update state
        switch (action.type) {
            case 'INIT':
                return {
                    error: null,
                    loading: true
                }
            case 'SUCCESS':
                return {
                    error: null,
                    loading: false,
                    categories: [...action.payload]
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}