import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainPage from './containers/MainPage.js';

const APP_URL = "http://localhost:3000/";


function App() {
  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
