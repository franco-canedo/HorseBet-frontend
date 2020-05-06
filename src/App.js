
import './App.css';
import React from 'react';
import Game from './containers/Game';
import { ActionCableProvider } from 'react-actioncable-provider';
import { API_WS_ROOT } from './constants';

const App = () => {
  return (
    <div className="App">
      <ActionCableProvider url={API_WS_ROOT}>
        <Game />
      </ActionCableProvider>

    </div>
  );

}

export default App;
