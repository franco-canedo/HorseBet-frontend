const initialState = {
    activeGame: []
}

const activeGame = (state = initialState, action) => {
    console.log(action.payload)
    switch (action.type) {
        case 'UPDATE_ACTIVE_GAME':
            return { ...state, activeGame: action.payload }
        default:
            return state;
    }
}

export default activeGame;