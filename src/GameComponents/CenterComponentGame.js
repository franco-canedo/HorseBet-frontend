import React, { Component, Fragment } from "react";
import Animation from './Animation.js';
import horseImage from '../Images/horseface.png';
import { API_ROOT, HEADERS } from '../constants';
import Spinner from 'react-bootstrap/Spinner';
import JumbotronComponent from './Jumbotron.js'


class CenterComponentGame extends Component {
    constructor() {
        super()
        this.state = {
            horseChosen: false,
            active: false,
        }
    }
    handleHorseClick = (id) => {
        console.log(this.props.userId);
        const body = {
            user_id: this.props.userId,
            horse_id: id,
            game_id: this.props.activeGame[0].id
        }
        console.log(body)
        const configObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)
        }
        fetch(`${API_ROOT}/userHorse`, configObj)
            .then(r => r.json())
            .then(json => {
                console.log(json);
                const currentGameId = this.props.activeGame[0].id
                this.props.updateActiveGame(currentGameId);
                this.setState({
                    horseChosen: true
                })
                this.props.handleHorseChosen(id);
                this.activateGame();
            });
    }

    renderHorses = () => {
        if (this.props.activeGame.length > 0) {
            return <div className="horseListDiv">
                <h4>Choose a horse to bet on!</h4>
                {this.props.activeGame[0].horses && this.props.activeGame[0].horses.map(horse => {
                    return <button onClick={() => this.handleHorseClick(horse.id)} key={horse.id} className="chooseHorse">
                        <p>{horse.name}, {horse.id}</p>
                        <img alt="Horse face" src={horseImage} height="35" width=""></img>
                    </button>
                })}

            </div>
        }
    }

    activateGame = () => {
        if (this.props.activeGame.length > 0) {
            if (this.props.activeGame[0].active) {
                const boolean = this.props.activeGame[0].active;
                this.setState({
                    active: boolean
                })
            }
        }
    }

    render() {
        return (
            <div className="CenterComponentGame">
                {
                    this.props.activeGame.length === 0 ? <JumbotronComponent /> : this.props.activeGame[0].active ?
                        <Fragment>
                            <Animation
                                user={this.props.user}
                                speedTest={this.props.speedTest}
                                horses={this.props.horses}
                                activeGame={this.props.activeGame}
                                // horseSpeed1={this.props.horseSpeed1}
                                // horseSpeed2={this.props.horseSpeed2}
                                // horseSpeed3={this.props.horseSpeed3}
                                // horseSpeed4={this.props.horseSpeed4}
                                animation={this.props.animation} />

                        </Fragment> : this.state.horseChosen ?
                            <Fragment>
                                <h2>Waiting for others to bet...</h2>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </Fragment> : this.props.activeGame[0].game_users.length >= 2 ?
                                <div className="game">
                                    {this.renderHorses()}
                                </div> :  <Fragment>
                                <h2>Waiting for other players to join...</h2>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </Fragment>
                }

            </div>
        );
    }
}

export default CenterComponentGame;