
import loggedReducer from './isLogged';
import createUser from './createUser';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    currentUser: createUser
})

export default allReducers;