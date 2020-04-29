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
            activeGames: [],
            activeGame: [],
            activeGameId: null,
            active: false,
            horseChosen: false,
            horses: [],
            horseBooId: 0,
            speedTest: 3,
            horseSpeed1: -5,
            horseSpeed2: -5,
            horseSpeed3: -5,
            horseSpeed4: -5,
            user_id: 4


        }
    }

    handleHorseChosen = (id) => {
        const horse = this.state.horses.find(h => h.id === id);

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

    // componentDidUpdate = () => {
    //     fetch(`${API_ROOT}/activeGames`)
    //         .then(res => res.json())
    //         .then(games => this.setState({ activeGames: games }));
    // }


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
        
        const horse = this.state.horses.find(h => h.id === boo.horse_id);

        const index = this.state.horses.indexOf(horse)
        console.log(horse.speed);
        horse.speed = horse.speed + 5;
        console.log(horse.speed);
        const array = [...this.state.horses]
        array[index] = horse;
        this.setState(prevState => {
            return {
                speedTest: prevState.speedTest + 5,
                horses: array
            }
           
        })

    };

    handleReceivedHype = (response) => {
        console.log('HYPE', response)
        const { hype } = response;
        console.log(hype.game_id);
        const horse = this.state.horses.find(h => h.id === hype.horse_id);

        const index = this.state.horses.indexOf(horse)
        horse.speed = horse.speed - 5;
        const array = [...this.state.horses]
        array[index] = horse;
        this.setState(prevState => {
            return {
                speedTest: prevState.speedTest - 5,
                horses: array
            }
           
        })
    }

    handleReceivedUserHorse = (response) => {
        const { userHorse } = response;
        // console.log(response[0].active);
        console.log(response.user_horse);
        console.log(response.user_horse.id);
        if(response.user_horse.active === true) {
            console.log('true?');
            if(response.user_horse.game_id === this.state.activeGame[0].id) {
                let game = this.state.activeGame[0];
                game.active = true;
                console.log(game)
                this.setState({
                    activeGame: [game]
                })
            }
        }
    }

    // animation = () => {
    //     this.setState(prevState => ({
    //         horseSpeed1: prevState.horseSpeed1 + .5,
    //         horseSpeed2: prevState.horseSpeed2 + .5,
    //         horseSpeed3: prevState.horseSpeed3 + .5,
    //         horseSpeed4: prevState.horseSpeed4 + .5,
    //     }));
    // }

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
                        activeGameId={this.state.activeGame.length ? this.state.activeGame[0].id : null}
                        handleReceivedBoo={this.handleReceivedBoo}
                        handleReceivedHype={this.handleReceivedHype}
                        handleReceivedUserHorse={this.handleReceivedUserHorse}
                    />
                ) : null}

                <LeftComponentGame
                    userId={this.state.user_id}
                    activeGame={this.state.activeGame} />
                <CenterComponentGame
                    userId={this.state.user_id}
                    speedTest={this.state.speedTest}
                    booId={this.state.horseBooId}
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