import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS, API_WS_ROOT } from '../constants';


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
                user_id: this.props.userId.currentUser.id,
                game_id: this.props.joinableGames[0]['id'],
                total_bet: this.props.joinableGames[0]['minimum_bet'],
                extra_bet: this.props.joinableGames[0]['minimum_bet']
            }

            const configObj = {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(body)
            }
            fetch(`${API_ROOT}/joinGame`, configObj)
                .then(r => r.json())
                .then(json => {
                    console.log(json);
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
            fetch(`${API_ROOT}/newGame`, configObj) // join game after if (resp.data.status === "created")
            // .then(resp => resp.json())
            // .then(game => console.log(game))
            setTimeout(() => {
                if (this.props.joinableGames.length > 0) {
                    const body2 = {
                        user_id: this.props.userId.currentUser.id,
                        game_id: this.props.joinableGames[0]['id'],
                        total_bet: this.props.joinableGames[0]['minimum_bet'],
                        extra_bet: this.props.joinableGames[0]['minimum_bet']
                    }

                    const configObj2 = {
                        method: 'POST',
                        headers: HEADERS,
                        body: JSON.stringify(body2)
                    }
                    fetch(`${API_ROOT}/joinGame`, configObj2)
                        .then(r => r.json())
                        .then(json => {
                            console.log(json);
                            this.props.handleActiveGame(json)
                        });
                }
            }, 3000);
        }
    }

    handleBooClick = (horseId) => {
        console.log("boo?");
        const body = {
            game_id: this.props.activeGame[0].id,
            horse_id: horseId,
            user_id: this.props.userId.currentUser.id
        }
        fetch(`${API_ROOT}/boo`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)
        });
    }

    handleHypeClick = (horseId) => {
        console.log('hype?');
        const body = {
            game_id: this.props.activeGame[0].id,
            horse_id: horseId,
            user_id: this.props.userId.currentUser.id
        }
        fetch(`${API_ROOT}/hype`, {
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
                                <button
                                    onClick={() => this.handleHypeClick(horse.id)}
                                    className="speedButtonsRightComp">Hype!</button>
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