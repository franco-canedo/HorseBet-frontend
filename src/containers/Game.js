import React, { Component } from "react";
import AllThreeGame from './AllThreeGame.js';
import HeaderGame from '../GameComponents/HeaderGame.js';
import { ActionCableConsumer } from 'react-actioncable-provider';



class Game extends Component {
    handleReceivedGameUser = (response) => {
        console.log("parent action cable", response);
    }

    handleReceivedGame = (response) => {
        console.log("received game", response);
    }

    render() {
        return (
            <div >
                <HeaderGame />
                <AllThreeGame />
                <ActionCableConsumer
                    channel={{ channel: 'GameUsersChannel' }}
                    onReceived={this.handleReceivedGameUser}
                />
                <ActionCableConsumer
                    channel={{ channel: 'GamesChannel' }}
                    onReceived={this.handleReceivedGame}
                />
            </div>
        );
    }
}

export default Game;