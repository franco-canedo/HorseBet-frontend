import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import MainPage from './containers/MainPage.js';
import ProfilePage from './containers/ProfilePage.js'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import { Provider } from 'react-redux';

import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

const storeEnhancers = () => {
  return (
    allReducers,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
}


const store = createStore(
  allReducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <React.StrictMode>
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/game" component={App} />
        </React.StrictMode>
      </Router>
    </Provider>
  </div>
  ,
  document.getElementById('root')
);

export default store;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
