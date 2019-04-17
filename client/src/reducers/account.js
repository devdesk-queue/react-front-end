const initState = {
    error: null,
    loading: false
}

export const account = (state = initState, action) => {

    //If it's an account action
    if (action.type.includes('ACCOUNT')) {

        //Store the original action type
        const originalActionType = action.type;
        //Get the lifecycle of action (init, success, or error)
        action.type = action.type.slice(action.type.lastIndexOf('_') + 1);

        //Update state based  the lifecycle of the action
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
    } else {
        return state;
    }
}