const initState = {
    error: null,
    loading: false,
    roles: []
}

export const roles = (state = initState, action) => {

    //If it's a roles action
    if (action.type.includes('ROLES')) {

        //Store the original action type
        const originalActionType = action.type;
        //Get the lifecycle of action (init, success, or error)
        action.type = action.type.slice(action.type.lastIndexOf('_') + 1);

        //Update state based  the lifecycle of the action
        switch (action.type) {
            case 'INIT':
                return {
                    error: null,
                    loading: true,
                    roles: state.roles
                }
            case 'SUCCESS':
                return {
                    error: null,
                    loading: false,
                    roles: action.payload
                }
            case 'ERROR':
                return {
                    error: action.payload,
                    loading: false,
                    roles: state.roles
                }
            default:
                return state;
        }
    } else {
        return state;
    }
}