
import './App.css';
import React from 'react';
import MainPage from './containers/MainPage.js';
import store from './index.js';
import { Provider } from 'react-redux';

const APP_URL = "http://localhost:3000/";

const App = () =>  {
  return (
    <div className="App">
      
      <MainPage />
    </div>
  );
  
}

export default App;
