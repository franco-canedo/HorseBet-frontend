import React, { Component } from "react";
import LeftComponentGame from "../GameComponents/LeftComponentGame";
import RightComponentGame from "../GameComponents/RightComponentGame";
import CenterComponentGame from "../GameComponents/CenterComponentGame";
import Footer from '../components/Footer';
import { API_ROOT } from '../constants';
import { ActionCable } from 'react-actioncable-provider';
import Cable from '../GameComponents/Cable';

class AllThreeGame extends Component {
    constructor() {
        super()
        this.state = {
            games: [],
            activeGameId: 5
        }
    }

    componentDidMount = () => {
        fetch(`${API_ROOT}/activeGames`)
            .then(res => res.json())
            .then(games => this.setState({ games }));
    };

    handleClick = id => {
        this.setState({ activeGame: id });
    };

    handleReceivedGame = response => {
        const { game } = response;
        this.setState({
            games: [...this.state.games, game]
        });
    };

    handleReceivedBoo = response => {
        console.log('BOOOOO')
        const { boo } = response;
        const games = [...this.state.games];
        const game = games.find(
          g => g.id === boo.game_id
        );
        const horse = game.horses.find(
            h => h.id === boo.horse_id
        )


        game.horses = [...game.horses, horse];
        this.setState({ games });
      };

    render() {
        const { games, activeGameId } = this.state;
        console.log(games);
        return (
            <div className="AllThree">
                <ActionCable
                    channel={{ channel: 'GamesChannel' }}
                    onReceived={this.handleReceivedGame}
                />
                {this.state.games.length ? (
          <Cable
            games={games}
            handleReceivedMessage={this.handleReceivedBoo}
          />
        ) : null}
                <LeftComponentGame />
                <CenterComponentGame />
                <RightComponentGame />
                <Footer />
            </div>
        );
    }
}

export default AllThreeGame;

// const findActiveGame = (games, activeGameId) => {
//     return games.find(game => game.id === activeGameId);
//   };