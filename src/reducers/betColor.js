const betColor = (state = false, action) => {
    switch (action.type) {
        case 'RED':
            return !state;
        case 'NORMAL_BET_COLOR':
            return !state;
        default:
            return state;
    }
}

export default betColor;