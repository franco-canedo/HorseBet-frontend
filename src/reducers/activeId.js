const activeId = (state = 0, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_ID':
            return action.payload
        default:
            return state;
    }
}

export default activeId;