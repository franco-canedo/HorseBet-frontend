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
            joinableGames: [],
            activeGame: [],
            activeGameId: null,
            active: false,
            horseChosen: false,
            horses: [],
            horseSpeed1: 10,
            horseSpeed2: 10,
            horseSpeed3: 10,
            horseSpeed4: 10,
            user_id: 7


        }
    }

    handleHorseChosen = (id) => {
        console.log(id)
        const horse = this.state.horses.find(h => h.id === id);
        console.log(horse)

        const index = this.state.horses.indexOf(horse)
        horse.chosen = true;
        const array = [...this.state.horses]
        array[index] = horse;

        this.setState({
            horseChosen: true,
            horses: array
        })
    }


    handleActiveGame = (join) => {
        fetch(`${API_ROOT}/games/${join.game_id}`)
            .then(resp => resp.json())
            .then(game => {
                // console.log(game);
                this.setState(prevState => {
                    return {
                        activeGame: [game],
                        // activeGameId: game.id
                    }

                })
                this.setGameHorses(game);
            })
    }

    setGameHorses = (game) => {
        const h1 = game.horses[0];
        const h2 = game.horses[1];
        const h3 = game.horses[2];
        const h4 = game.horses[3];

        this.setState({
            horses: [
                {
                    id: h1.id,
                    speed: 10
                },
                {
                    id: h2.id,
                    speed: 10
                },
                {
                    id: h3.id,
                    speed: 10
                },
                {
                    id: h4.id,
                    speed: 10
                },
            ]
        })
    }

    updateActiveGame = (id) => {
        fetch(`${API_ROOT}/games/${id}`)
            .then(resp => resp.json())
            .then(game => {
                console.log(game);
                this.setState(prevState => {
                    return {
                        activeGame: [game],
                        // activeGameId: game.id
                    }

                })
            })
    }

    componentDidMount = () => {
        fetch(`${API_ROOT}/joinableGames`)
            .then(res => res.json())
            .then(games => this.setState({ joinableGames: games }));
    };


    handleReceivedGame = response => {
        const { game } = response;
        this.setState(prevState => {
            return {
                joinableGames: [...prevState.joinableGames, game]
            }
        });
    };

    handleReceivedBoo = response => {
        console.log('BOOOOO', response)
        const { boo } = response;
        // const games = [...this.state.games];
        // const game = games.find(
        //     g => g.id === boo.game_id
        // );
        // const horse = game.horses.find(
        //     h => h.id === boo.horse_id
        // )


        this.setState(prevState => {
            return {
                horseSpeed1: prevState.horseSpeed1 - 5
            }
        })
        // this.setState({ games });
    };

    animation = () => {
        this.setState(prevState => ({
            horseSpeed1: prevState.horseSpeed1 + .5,
            horseSpeed2: prevState.horseSpeed2 + .5,
            horseSpeed3: prevState.horseSpeed3 + .5,
            horseSpeed4: prevState.horseSpeed4 + .5,
        }));
    }

    render() {
        const { joinableGames, activeGameId } = this.state;
        return (
            <div className="AllThree">
                <ActionCable
                    channel={{ channel: 'GamesChannel' }}
                    onReceived={this.handleReceivedGame}
                />
                {this.state.joinableGames.length ? (
                    <Cable
                        joinableGames={joinableGames}
                        handleReceivedBoo={this.handleReceivedBoo}
                    />
                ) : null}

                <LeftComponentGame activeGame={this.state.activeGame} />
                <CenterComponentGame
                    userId={this.state.user_id}
                    updateActiveGame={this.updateActiveGame}
                    activeGameHorses={this.state.activeGame.horses}
                    activeGame={this.state.activeGame}
                    handleHorseChosen={this.handleHorseChosen}
                    horses={this.state.horses}
                    horseSpeed1={this.state.horseSpeed1}
                    horseSpeed2={this.state.horseSpeed2}
                    horseSpeed3={this.state.horseSpeed3}
                    horseSpeed4={this.state.horseSpeed4}
                    animation={
                        this.state.activeGame.length === 0 ? 
                        null :
                        this.state.activeGame[0].active ? this.animation : null
                        } />

                <RightComponentGame
                    userId={this.state.user_id}
                    handleActiveGame={this.handleActiveGame}
                    activeGame={this.state.activeGame}
                    horses={this.state.horses}
                    horseChosen={this.state.horseChosen}
                    joinableGames={this.state.joinableGames} />
                <Footer />
            </div>
        );
    }
}

export default AllThreeGame;

// const findActiveGame = (games, activeGameId) => {
//     return games.find(game => game.id === activeGameId);
//   };