import React, { Component } from "react";
import LeftComponentGame from "../GameComponents/LeftComponentGame";
import RightComponentGame from "../GameComponents/RightComponentGame";
import CenterComponentGame from "../GameComponents/CenterComponentGame";
import Footer from '../components/Footer';
import { API_ROOT } from '../constants';
import { ActionCable, ActionCableConsumer } from 'react-actioncable-provider';
import Cable from '../GameComponents/Cable';

import { connect } from 'react-redux';
import { getProfileFetch } from '../actions';
import { setGameHorses } from '../actions'
import { increment } from '../actions'
import { decrement } from '../actions'
import { updateActiveGame } from '../actions'
import { jackpotColorYellow } from '../actions'
import { jackpotColorNormal } from '../actions'
import { betColorRed } from '../actions'
import { betColorNormal } from '../actions'


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
            user_id: 10


        }
    }

    componentDidMount = () => {
        fetch(`${API_ROOT}/joinableGames`)
            .then(res => res.json())
            .then(games => this.setState({ joinableGames: games }));

        this.props.getProfileFetch()
    };
    // causes rerender
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
    //causes rerender
    handleActiveGame = (id) => {
        console.log('handle active?', id)
        fetch(`${API_ROOT}/games/${id}`)
            .then(resp => resp.json())
            .then(game => {
                console.log('fetched', game);
                this.props.updateActiveGame(game.id);
                setTimeout(() => {
                    this.setState(prevState => {
                        return {
                            activeGame: [game],
                            // activeGameId: game.id
                        }

                    })

                }, 1000
                )
                this.setGameHorses(game);
                this.props.setGameHorses(game);

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

    //causes rerender
    updateActiveGameLame = (id) => {
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
    //causes rerender
    handleReceivedGame = response => {
        console.log('joinableGame', response)
        const { game } = response;
        this.setState(prevState => {
            return {
                joinableGames: [...prevState.joinableGames, game]
            }
        });
    };

    handleReceivedBoo = response => {
        console.log('BOOOOO', response)
        this.props.increment(response);
        this.props.updateActiveGame(this.state.activeGame[0].id);
        this.props.jackpotColorYellow();
        if(response.user_id === this.props.currentUser.id) {
            this.props.betColorRed();
            setTimeout(() => {
                this.props.betColorNormal();
            }, 200)
        }
        setTimeout(() => {
            this.props.jackpotColorNormal();
        }, 200)

    };

    handleReceivedHype = (response) => {
        console.log('HYPE', response)
        this.props.updateActiveGame(this.state.activeGame[0].id);
        this.props.decrement(response);
        this.props.jackpotColorYellow();
        if(response.user_id === this.props.currentUser.id) {
            this.props.betColorRed();
            setTimeout(() => {
                this.props.betColorNormal();
            }, 200)
        }
        setTimeout(() => {
            this.props.jackpotColorNormal();
        }, 200)
    }
    // causes rerender
    handleReceivedUserHorse = (response) => {
        const { userHorse } = response;
        console.log('userhorse', response)
        console.log(response.user_horse.active)
        if (response.user_horse.active === true) {
            console.log('true?')
            if (response.user_horse.game_id === this.state.activeGame[0].id) {
                let game = this.state.activeGame[0];
                game.active = true;
                console.log(game)
                this.setState({
                    activeGame: [game]
                })
            }
        }
    }
    // causes rerender
    handleReceivedGameUser = (response) => {
        console.log('GameUser', response);
        let id = response.game_user.game_id;
        if (this.state.activeGame.length === 0) {
            console.log('update active game', id, this.props.currentUser.currentUser.id)

            if (this.props.currentUser.currentUser.id === response.game_user.user_id) {
                console.log('update active game2')
                this.handleActiveGame(id);
                // this.props.updateActiveGame(id);
            }

        } else {
            if (id === this.state.activeGame[0].id) {
                this.handleActiveGame(id);
                // this.props.updateActiveGame(id);
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
                <ActionCableConsumer
                    channel={{ channel: 'GamesChannel' }}
                    onReceived={this.handleReceivedGame}
                />
                <ActionCableConsumer
                    channel={{ channel: 'GameUsersChannel' }}
                    onReceived={this.handleReceivedGameUser}
                />
                

                {this.state.joinableGames.length ? (
                    <Cable
                        activeGameId={this.state.activeGame.length ? this.state.activeGame[0].id : null}
                        handleReceivedBoo={this.handleReceivedBoo}
                        handleReceivedHype={this.handleReceivedHype}
                        handleReceivedUserHorse={this.handleReceivedUserHorse}
                        handleReceivedGameUser={this.handleReceivedGameUser}
                    />
                ) : null}

                <LeftComponentGame
                    user={this.props.currentUser}
                    userId={this.props.currentUser}
                    activeGameLame={this.state.activeGame}
                />
                <CenterComponentGame
                    userId={this.props.currentUser.currentUser.id}
                    user={this.props.currentUser}
                    speedTest={this.state.speedTest}
                    booId={this.state.horseBooId}
                    updateActiveGame={this.updateActiveGameLame}
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
                    userId={this.props.currentUser}
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

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
    setGameHorses: (game) => dispatch(setGameHorses(game)),
    increment: (boo) => dispatch(increment(boo)),
    decrement: (hype) => dispatch(decrement(hype)),
    updateActiveGame: (id) => dispatch(updateActiveGame(id)),
    jackpotColorYellow: () => dispatch(jackpotColorYellow()),
    jackpotColorNormal: () => dispatch(jackpotColorNormal()),
    betColorRed: () => dispatch(betColorRed()),
    betColorNormal: () => dispatch(betColorNormal()),
})

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllThreeGame);

