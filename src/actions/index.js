import { API_ROOT, HEADERS } from '../constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReduxThunk from 'redux-thunk'

export const setGamesNewsFeed = games => {
    return dispatch => {
        fetch(`${API_ROOT}/games`)
            .then(r => r.json())
            .then(games => {
                dispatch(newsFeed(games))
            })
    }
}
    
const newsFeed = games => ({
    type: 'SET_NEWS_FEED',
    payload: games
})

export const increment = boo => ({
    type: 'INCREMENT',
    payload: boo
})

export const decrement = hype => ({
    type: 'DECREMENT',
    payload: hype
})

export const updateActiveGame = id => {
    return dispatch => {
        fetch(`${API_ROOT}/games/${id}`)
            .then(resp => resp.json())
            .then(game => {
                dispatch(updateActive(game))

            })
    }
}
const updateActive = game => ({
    type: 'UPDATE_ACTIVE_GAME',
    payload: game
})



export const setGameHorses = game => {
    console.log(game)
    const h1 = game.horses[0];
    const h2 = game.horses[1];
    const h3 = game.horses[2];
    const h4 = game.horses[3];
    const horses = [
        {
            id: h1.id,
            speed: 10
        },
        {
            id: h2.id,
            speed: 10
        },
        {
            id: h3.id,
            speed: 10
        },
        {
            id: h4.id,
            speed: 10
        },
    ]
    return dispatch => (
        dispatch(setHorses(horses))
    )
}

const setHorses = horses => ({
    type: 'SET_HORSES',
    payload: horses
})

export const userPostFetch = user => {
    return dispatch => {
        return fetch(`${API_ROOT}/api/v1/users`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ user })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                if (data.user) {
                    alert('Account created! Please log in.')
                } else {
                    if (data.error.username) {
                        alert('Username already taken')
                        // Here you should have logic to handle invalid creation of a user.
                        // This assumes your Rails API will return a JSON object with a key of
                        // 'message' if there is an error with creating the user, i.e. invalid username
                    } else if (data.error.password) {
                        alert('Password has to be at least 5 characters')
                    } else {
                        alert('Account created! Please log in.')
                        //localStorage.setItem("token", data.jwt)
                        // dispatch(loginUser(data.user))
                        // dispatch(loggedIn())
                    }
                }


            })
    }
}

export const userLoginFetch = user => {
    return dispatch => {
        return fetch(`${API_ROOT}/api/v1/login`, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ user })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    // Here you should have logic to handle invalid login credentials.
                    // This assumes your Rails API will return a JSON object with a key of
                    // 'message' if there is an error
                    alert(data.message)
                    console.log(data.message)
                } else {
                    localStorage.setItem("token", data.jwt)
                    console.log(data);
                    dispatch(loginUser(data.user))
                    dispatch(loggedIn())
                }
            })
    }
}

export const getProfileFetch = () => {
    console.log('profile fetch')
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch(`${API_ROOT}/api/v1/profile`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // An error will occur if the token is invalid.
                        // If this happens, you may want to remove the invalid token.
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data.user))
                    }
                })
        }
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

const loggedIn = () => ({
    type: 'SIGN_IN',
})

export const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

export const loggedOut = () => ({
    type: 'SIGN_OUT',
})


