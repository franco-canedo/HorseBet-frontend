import counterReducer from './counter';
import loggedReducer from './isLogged';
import createUser from './createUser';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    newUser: createUser
})

export default allReducers;