import React, { Component } from "react";
import AllThreeGame from './AllThreeGame.js';
import HeaderGame from '../GameComponents/HeaderGame.js';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { connect } from 'react-redux';
import { setGameHorses } from '../actions'
import { increment } from '../actions'
import { decrement } from '../actions'
import { updateActiveGame } from '../actions'
import { jackpotColorYellow } from '../actions'
import { jackpotColorNormal } from '../actions'
import { betColorRed } from '../actions'
import { betColorNormal } from '../actions'



class Game extends Component {
    constructor() {
        super()
        this.state = {
            joinableGames: []
        }
    }
    handleReceivedGameUser = (response) => {
        console.log("parent gameUser", response);
    }

    handleReceivedGame = (response) => {
        console.log("parent game", response);
    }

    handleReceivedUserHorse = (response) => {
        console.log("parent userHorse", response);
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
                <ActionCableConsumer
                    // key={activeGameId}  
                    channel={{ channel: 'UserHorsesChannel', game: this.props.activeGame.id }}
                    onReceived={this.handleReceivedUserHorse}
                />
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

const mapDispatchToProps = dispatch => ({
    setGameHorses: (game) => dispatch(setGameHorses(game)),
    increment: (boo) => dispatch(increment(boo)),
    decrement: (hype) => dispatch(decrement(hype)),
    updateActiveGame: (id) => dispatch(updateActiveGame(id)),
    jackpotColorYellow: () => dispatch(jackpotColorYellow()),
    jackpotColorNormal: () => dispatch(jackpotColorNormal()),
    betColorRed: () => dispatch(betColorRed()),
    betColorNormal: () => dispatch(betColorNormal()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);


