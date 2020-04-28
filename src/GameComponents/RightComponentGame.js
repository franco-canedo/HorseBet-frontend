import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';


class RightComponentGame extends Component {
    constructor() {
        super()
        this.state = {
            chooseGame: false
        }
    }

    handlePlayClick = () => {
        this.setState({
            chooseGame: true
        })
    }

    handleGameFetch = (event) => {
        if (this.props.joinableGames.length > 0) {
            const body = {
                user_id: this.props.userId,
                game_id: this.props.joinableGames[0]['id']
            }

            const configObj = {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(body)
            }
            fetch(`${API_ROOT}/joinGame`, configObj)
                .then(r => r.json())
                .then(json => {
                    this.props.handleActiveGame(json)
                });
        } else {
            const body = {
                minimum_bet: event.target.value,
                jackpot: event.target.value * 4
            }

            const configObj = {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(body)
            }
            alert('Joining a game... Please wait')
            fetch(`${API_ROOT}/newGame`, configObj)
            // .then(resp => resp.json())
            // .then(game => console.log(game))
        }
    }

    handleBooClick = (horseId) => {
        console.log("boo?");
        const body = {
            game_id: this.props.activeGame[0].id,
            horse_id: horseId
        }
        fetch(`${API_ROOT}/boo`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)
        });
    }



    renderSpeedButtons = () => {
        if (this.props.activeGame.length > 0) {

            return this.props.horses.map(horse => {
                // console.log('map?')
                if (horse.chosen) {
                    // console.log("if?", horse);
                    return <div className="lights">

                        <div className="spanLights">
                            <div className="speed">
                                <button className="speedButtonsRightComp">Hype!</button>
                            </div>
                        </div>
                    </div>
                } else {
                    return <div className="lights">

                        <div className="spanLights">
                            <div className="speed">
                                <button
                                    onClick={() => this.handleBooClick(horse.id)}
                                    className="speedButtonsRightComp">Boo!</button>
                            </div>
                        </div>
                    </div>
                }
            })
        }
    }


    render() {
        return (
            <div className="RightComponentGame">
                <div className="lightsContainer">
                    {
                        this.props.horseChosen ?
                            this.renderSpeedButtons() : <Fragment>
                                <div className="lights">

                                    <div className="spanLights">
                                        <div className="speed">

                                        </div>
                                    </div>


                                </div>
                                <div className="lights">
                                    <div className="spanLights">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                                <div className="lights">
                                    <div className="spanLights">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                                <div className="lights">
                                    <div className="spanLights">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                            </Fragment>

                    }


                </div>
                <div className="rightCompBottomDiv">
                    {
                        this.state.chooseGame ?
                            <Fragment>
                                <h4>Select Minimum Bet:</h4>
                                <button value="1" onClick={this.handleGameFetch}>$1</button>
                                <button value="5" onClick={this.handleGameFetch}>$5</button>
                                <button value="10" onClick={this.handleGameFetch}>$10</button>
                                <button value="20" onClick={this.handleGameFetch}>$20</button> </Fragment> :
                            <button className="ButtonsNavBar" onClick={this.handlePlayClick}>Play!</button>
                    }

                </div>

            </div>
        );
    }
}

export default RightComponentGame;