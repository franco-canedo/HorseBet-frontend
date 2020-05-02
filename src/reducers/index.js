
import loggedReducer from './isLogged';
import createUser from './createUser';
import {combineReducers} from 'redux';
import horses from './horses';
import activeGame from './activeGame';
import gamesNewsFeed from './gamesNewsFeed';
import jackpotColor from './jackpotColor';
import betColor from './betColor';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    currentUser: createUser,
    horses: horses,
    activeGame: activeGame,
    games: gamesNewsFeed,
    jackpotColor: jackpotColor,
    betColor: betColor,
})

export default allReducers;