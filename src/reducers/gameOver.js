export default function gameOverReducer(state = false, action) {
    switch (action.type) {
        case 'GAME_OVER':
            return !state
        
        default:
            return state;
    }
}