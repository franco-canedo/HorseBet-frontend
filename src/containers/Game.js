import React, { Component } from "react";
import AllThreeGame from './AllThreeGame.js';
import HeaderGame from '../GameComponents/HeaderGame.js';
import { API_ROOT } from '../constants';
import { ActionCable } from 'react-actioncable-provider';
import Cable from '../GameComponents/Cable';


class Game extends Component {
    constructor() {
        super()
        this.state = {
            games: [],
            activeGame: null
        }
    }

    componentDidMount = () => {
        fetch(`${API_ROOT}/games`)
            .then(res => res.json())
            .then(games => this.setState({ games }));
    };

    handleClick = id => {
        this.setState({ activeGame: id });
    };

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