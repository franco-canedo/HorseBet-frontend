import React, { Component } from 'react';

class LeftComponentGame extends Component {
    render() {
        return (
            <div className="LeftComponent">
                <div className="GameInfoDivs ">
                    <h2>Jackpot:</h2>
                    <p>$4</p>
                </div>
                <div className="GameInfoDivs ">
                <h2>Your Bet:</h2>
                    <p>$1</p>
                </div>
                <div className="GameInfoDivs ">
                <h2>Money Left:</h2>
                    <p>$1</p>
                </div>
                
            </div>
        );
    }
}

export default LeftComponentGame;