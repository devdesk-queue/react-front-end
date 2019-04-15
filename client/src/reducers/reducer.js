const initState = {
    test: 'Hello World From Redux'
}

export const reducer = (state = initState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}