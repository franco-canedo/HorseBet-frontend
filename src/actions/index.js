import { API_ROOT, HEADERS } from '../constants';
import ReduxThunk from 'redux-thunk'

export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}

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
                if (data.message) {
                    // Here you should have logic to handle invalid creation of a user.
                    // This assumes your Rails API will return a JSON object with a key of
                    // 'message' if there is an error with creating the user, i.e. invalid username
                } else {
                    localStorage.setItem("token", data.jwt)
                    dispatch(loginUser(data.user))
                    dispatch(loggedIn())
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
                        console.log(data)
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
    

