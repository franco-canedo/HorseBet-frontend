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
import { betColorRed } from '../actions';
import { betColorNormal } from '../actions';
import { updateActiveId } from '../actions';
import { gameOverAction } from '../actions';



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
                this.props.updateActiveId(id)
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
        // console.log('joinableGame', response)
        const { game } = response;
        this.setState(prevState => {
            return {
                joinableGames: [...prevState.joinableGames, game]
            }
        });
    };

    handleReceivedBoo = response => {
        console.log('BOOOOO', response)
        this.props.updateActiveGame(this.state.activeGame[0].id);
        this.props.increment(response);       
        this.props.jackpotColorYellow();
        console.log(response.boo.user_id, this.props.currentUser.currentUser.id)
        if (response.boo.user_id === this.props.currentUser.currentUser.id) {
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
        console.log(response.hype.user_id, this.props.currentUser.currentUser.id)
        if (response.hype.user_id === this.props.currentUser.currentUser.id) {
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
        // console.log(response.user_horse.active)
        if (response.user_horse.active === true) {
            
            if (response.user_horse.game_id === this.state.activeGame[0].id) {
                let game = this.state.activeGame[0];
                game.active = true;
                if(response.user_horse.user_id === this.props.currentUser.currentUser.id) {
                    console.log('handleHorseChosen?')
                    this.handleHorseChosen(response.user_horse.horse_id)
                }
                
                this.updateActiveGameLame(response.user_horse.game_id)
                // console.log(game)
                // this.setState({
                //     activeGame: [game]
                // })
            }
        } else {
            if(response.user_horse.user_id === this.props.currentUser.currentUser.id) {
                console.log('handleHorseChosenElse')
                this.handleHorseChosen(response.user_horse.horse_id)
            }
        }
    }
    // causes rerender
    handleReceivedGameUser = (response) => {
        // console.log('GameUser', response);
        let id = response.game_user.game_id;
        if (this.state.activeGame.length === 0) {
            // console.log('update active game', id, this.props.currentUser.currentUser.id)

            if (this.props.currentUser.currentUser.id === response.game_user.user_id) {
                // console.log('update active game2')
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

    handleReceiverGameWinners = (response) => {
        console.log(response);
        this.props.updateActiveGame(this.state.activeGame[0].id);
        if (!this.props.gameOver) {
            this.props.gameOverAction();
        }
        // console.log(this.props.activeGame)
        const winner = this.state.activeGame[0].users.find(user => {
            return user.id === response.game_winner.user_id
        })
        alert(`${winner.username} won the game!`);
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
                    channel={{ channel: 'GameUsersChannel' }}
                    onReceived={this.handleReceivedGameUser}
                />
                <ActionCableConsumer
                    channel={{ channel: 'GamesChannel' }}
                    onReceived={this.handleReceivedGame}
                />
                <ActionCableConsumer
                    // key={activeGameId}  
                    channel={{ channel: 'UserHorsesChannel', game: this.state.activeGame.length ? this.state.activeGame[0].id : null }}
                    onReceived={this.handleReceivedUserHorse}
                />

                <ActionCableConsumer
                    // key={activeGameId}  
                    channel={{ channel: 'GameWinnersChannel', game: this.state.activeGame.length ? this.state.activeGame[0].id : null }}
                    onReceived={this.handleReceiverGameWinners}
                />



                {this.state.activeGame.length ? (
                    <Cable
                        activeGameId={this.props.activeId}
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
    updateActiveId: (id) => dispatch(updateActiveId(id)),
    gameOverAction: () => dispatch(gameOverAction()),
})

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        activeId: state.activeId,
        gameOver: state.gameOver,
        // activeGame: state.activeGame
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllThreeGame);

