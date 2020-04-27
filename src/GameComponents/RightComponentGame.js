import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS } from '../constants';


class RightComponentProfile extends Component {
    constructor() {
        super()
        this.state = {
            choose: false
        }
    }

    handlePlayClick = () => {
        this.setState({
            choose: true
        })
    }

    handleGameFetch = (event) => {
        if (this.props.joinableGames.length > 0) { 
            const body = {
                user_id: 1,
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
            fetch(`${API_ROOT}/newGame`, configObj)
            // .then(resp => resp.json())
            // .then(game => console.log(game))
        }
    }


    render() {
        return (
            <div className="RightComponentGame">
                <div className="lightsContainer">
                    <div className="lights">

                        <div className="spanLights">
                            <div className="speed">
                                <h4>Speed:</h4>
                            </div>
                        </div>


                    </div>
                    <div className="lights">
                        <div className="spanLights">
                            <div className="speed">
                                <h4>Speed:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="lights">
                        <div className="spanLights">
                            <div className="speed">
                                <h4>Speed:</h4>
                            </div>
                        </div>
                    </div>
                    <div className="lights">
                        <div className="spanLights">
                            <div className="speed">
                                <h4>Speed:</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightCompBottomDiv">
                    {
                        this.state.choose ?
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

export default RightComponentProfile;