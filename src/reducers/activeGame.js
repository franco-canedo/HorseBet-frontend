const initialState = {
    activeGame: []
}

const activeGame = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ACTIVE_GAME':
            return { ...state, activeGame: action.payload }
        default:
            return state;
    }
}

export default activeGame;