import React, { Component, Fragment } from 'react';
import { API_ROOT, HEADERS, API_WS_ROOT } from '../constants';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Overlay from 'react-bootstrap/Overlay';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';



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

    handleGameFetch = (bet) => {
        this.setState({
            chooseGame: true
        })
        if (this.props.joinableGames.length > 0) {
            const body = {
                user_id: this.props.userId.currentUser.id,
                game_id: this.props.joinableGames[0]['id'],
                total_bet: this.props.joinableGames[0]['minimum_bet'],
                extra_bet: this.props.joinableGames[0]['minimum_bet']
            }
            console.log(body);
            const configObj = {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(body)
            }
            fetch(`${API_ROOT}/joinGame`, configObj)
                // .then(r => r.json())
                // .then(json => {
                //     console.log(json);

                //     this.props.handleActiveGame(json)
                // });
        } else {
            const body = {
                minimum_bet: bet,
                jackpot: bet * 4
            }

            const configObj = {
                method: 'POST',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "content-length": 28403,
                    status: 200

                },
                body: JSON.stringify(body)
            }
            alert('Joining a game... Please wait')
            fetch(`${API_ROOT}/newGame`, configObj) // join game after if (resp.data.status === "created")
        

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
                        // .then(r => r.json())
                        // .then(json => {
                        //     console.log(json);
                        //     this.props.handleActiveGame(json)
                        // });
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
                if (horse.chosen) {
                    // console.log("if?", horse);
                    return <div className="lights">

                        <div className="spanLightsRed">
                            <div className="speed">
                                {/* <Button ref={'hype'} variant="outline-success" onClick={() => this.handleHypeClick(horse.id)}>Hype!</Button>{' '} */}
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <Button variant="outline-success" onClick={() => this.handleHypeClick(horse.id)}>Hype!</Button>
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                } else {
                    return <div className="lights">

                        <div className="spanLightsRed">
                            <div className="speed">
                                {/* <Button variant="outline-danger" onClick={() => this.handleBooClick(horse.id)}>Boo!</Button>{' '} */}
                                <OverlayTrigger
                                    placement="top"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipBoo}
                                >
                                    <Button variant="outline-danger" onClick={() => this.handleBooClick(horse.id)}>Boo!</Button>
                                </OverlayTrigger>
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

                                    <div className="spanLightsRed">
                                        <div className="speed">

                                        </div>
                                    </div>


                                </div>
                                <div className="lights">
                                    <div className="spanLightsRed">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                                <div className="lights">
                                    <div className="spanLightsRed">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                                <div className="lights">
                                    <div className="spanLightsRed">
                                        <div className="speed">

                                        </div>
                                    </div>
                                </div>
                            </Fragment>

                    }


                </div>
                <div className="rightCompBottomDiv">
                    {
                        this.state.chooseGame ? null :
                            <Dropdown>
                                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                    Choose bet size!
                                </Dropdown.Toggle>

                                <Dropdown.Menu onSelect={this.handleGameFetch}>
                                    <Dropdown.Item onClick={() => this.handleGameFetch(1)} eventKey='1' value="1" href="#/action-1">$1</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleGameFetch(5)} value="5" href="#/action-2">$5</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleGameFetch(10)} value="10" href="#/action-3">$10</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleGameFetch(20)} value="20" href="#/action-3">$20</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                    }

                    {/* {
                        this.state.chooseGame ?
                            <Fragment>
                                <h4>Select Minimum Bet:</h4>
                                <button value="1" onClick={this.handleGameFetch}>$1</button>
                                <button value="5" onClick={this.handleGameFetch}>$5</button>
                                <button value="10" onClick={this.handleGameFetch}>$10</button>
                                <button value="20" onClick={this.handleGameFetch}>$20</button> </Fragment> :
                            // <button className="ButtonsNavBar" onClick={this.handlePlayClick}>Play!</button>
                            <Button variant="dark" size="lg" onClick={this.handlePlayClick}>Play!</Button>
                    } */}

                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        jackpotColor: state.jackpotColor
    }
}

export default connect(mapStateToProps, null)(RightComponentGame);

function renderTooltip(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Hype your horse! -$0.05
        </Tooltip>
    );
}

function renderTooltipBoo(props) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Boo another horse! -$0.05
        </Tooltip>
    );
}