import React, { Component } from "react";
import AllThreeGame from './AllThreeGame.js';
import HeaderGame from '../GameComponents/HeaderGame.js';


class Game extends Component {
    render() {
        return (
            <div >
                <HeaderGame />
                <AllThreeGame />
            </div>
        );
    }
}

export default Game;