
import loggedReducer from './isLogged';
import createUser from './createUser';
import {combineReducers} from 'redux';
import horses from './horses'
import activeGame from './activeGame'

const allReducers = combineReducers({
    isLogged: loggedReducer,
    currentUser: createUser,
    horses: horses,
    activeGame: activeGame
})

export default allReducers;