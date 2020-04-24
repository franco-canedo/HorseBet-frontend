import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MainPage from './containers/MainPage.js';
import ProfilePage from './containers/ProfilePage.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux';
import allReducers from './reducers';
import { Provider } from 'react-redux';


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <div>

    <Router>
      <Provider store={store}>
        <App />
      </Provider>
      <React.StrictMode>
        {/* <Route exact path="/signin" component={Signin} /> */}
      <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/" component={MainPage} />
        {/* <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={Signin} /> */}
      </React.StrictMode>
    </Router></div>
  ,
  document.getElementById('root')
);

export default store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
