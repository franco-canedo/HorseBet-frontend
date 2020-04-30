import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeftComponentGame extends Component {
    totalBet = () => {
        console.log(this.props.activeGame.activeGame);
        if(this.props.activeGameLame.length > 0) {
            console.log('hello??')
            const gameUsers = this.props.activeGame.activeGame.game_users;
            const gameUser = gameUsers.find(user => user.user_id === this.props.user.currentUser.id)
            //const gameUser = gameUsers[gameUsers.length - 1]
            return gameUser.total_bet.toFixed(2)
            }
    }

    extraBet = () => {
        if(this.props.activeGameLame.length > 0) {
            const gameUsers = this.props.activeGame.activeGame.game_users;
            const gameUser = gameUsers.find(user => user.user_id === this.props.user.currentUser.id)
            //const gameUser = gameUsers[gameUsers.length - 1]
            return gameUser.extra_bet.toFixed(2)
            }
    }

    render() {
        return (
            <div className="LeftComponent">
                <div className="GameInfoDivs ">
                    <h2>Jackpot:</h2>
                    <p>${this.props.activeGameLame.length ? 
                    this.props.activeGame.activeGame.jackpot.toFixed(2) : null}</p>
                </div>
                <div className="GameInfoDivs ">
                    <h2>{this.props.user.currentUser.username}, Your Bet:</h2>
                    <p>${this.totalBet()}</p>
                </div>
                <div className="GameInfoDivs ">
                    <h2>Money Left:</h2>
                    <p>${this.extraBet()}</p>
                </div>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
      activeGame: state.activeGame
    }
  }

export default connect(mapStateToProps, null)(LeftComponentGame);
