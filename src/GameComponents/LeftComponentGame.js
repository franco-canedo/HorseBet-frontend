import React, { Component } from 'react';

class LeftComponentGame extends Component {
    totalBet = () => {
        if(this.props.activeGame.length > 0) {
            const gameUsers = this.props.activeGame[0].game_users;
            //const gameUser = gameUsers.find(user => user.user_id === this.props.userId)
            const gameUser = gameUsers[gameUsers.length - 1]
            return gameUser.total_bet.toFixed(2)
            }
    }

    extraBet = () => {
        if(this.props.activeGame.length > 0) {
            const gameUsers = this.props.activeGame[0].game_users;
            //const gameUser = gameUsers.find(user => user.user_id === this.props.userId)
            const gameUser = gameUsers[gameUsers.length - 1]
            return gameUser.extra_bet.toFixed(2)
            }
    }

    render() {
        return (
            <div className="LeftComponent">
                <div className="GameInfoDivs ">
                    <h2>Jackpot:</h2>
                    <p>${this.props.activeGame.length ? 
                    this.props.activeGame[0].jackpot.toFixed(2) : null}</p>
                </div>
                <div className="GameInfoDivs ">
                    <h2>Your Bet:</h2>
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

export default LeftComponentGame;