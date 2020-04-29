import { API_ROOT, HEADERS} from '../constants';
import ReduxThunk from 'redux-thunk'

export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}
// export const userPostFetch = user => {
//     return {
//         type: 'USER_POST_FETCH', 
//         payload: user
//     }
// }

export const userPostFetch = user => {
    return dispatch => {
      return fetch(`${API_ROOT}/api/v1/users`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({user})
      })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
          if (data.message) {
            // Here you should have logic to handle invalid creation of a user.
            // This assumes your Rails API will return a JSON object with a key of
            // 'message' if there is an error with creating the user, i.e. invalid username
          } else {
            localStorage.setItem("token", data.token)
            dispatch(loginUser(data.user))
          }
        })
    }
  }
  
  const loginUser = userObj => ({
      type: 'LOGIN_USER',
      payload: userObj
  })