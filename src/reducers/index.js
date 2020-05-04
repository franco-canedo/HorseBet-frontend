
import loggedReducer from './isLogged';
import createUser from './createUser';
import {combineReducers} from 'redux';
import horses from './horses';
import activeGame from './activeGame';
import gamesNewsFeed from './gamesNewsFeed';
import jackpotColor from './jackpotColor';
import betColor from './betColor';
import activeId from './activeId';
import gameOverReducer from './gameOver';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    currentUser: createUser,
    horses: horses,
    activeGame: activeGame,
    games: gamesNewsFeed,
    jackpotColor: jackpotColor,
    betColor: betColor,
    activeId: activeId,
    gameOver: gameOverReducer,
})

export default allReducers;