import React, { Component } from "react";
import AllThreeGame from './AllThreeGame.js';
import HeaderGame from '../GameComponents/HeaderGame.js';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { connect } from 'react-redux';



class Game extends Component {
    constructor() {
        super()
        this.state = {
            joinableGames: []
        }
    }
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
                {/* <ActionCableConsumer
                    // key={activeGameId}  
                    channel={{ channel: 'UserHorsesChannel', game: this.props.activeGame.id }}
                    onReceived={(resp) => console.log(resp)}
                /> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        activeGame: state.activeGame
    }
}

export default connect(mapStateToProps, null)(Game);


