const jackpotColor = (state = false, action) => {
    switch (action.type) {
        case 'YELLOW':
            return !state;
        case 'NORMAL':
            return !state;
        default:
            return state;
    }
}

export default jackpotColor;