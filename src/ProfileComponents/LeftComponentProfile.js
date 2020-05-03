import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import Card from 'react-bootstrap/Card';
import horseFace from '../Images/horseface.png';
import { connect } from 'react-redux';
import { setGamesNewsFeed } from '../actions'

class LeftComponentProfile extends Component {
    constructor() {
        super()
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        this.props.setGamesNewsFeed()
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevProps, prevState)
    //     fetch(`${API_ROOT}/games`)
    //         .then(r => r.json())
    //         .then(games => {
    //             this.setState({ games })
    //         })
    // }

    render() {
        let limitedGames = this.props.games;
        limitedGames = limitedGames.splice(0, 3);
        return (
            <div className="LeftComponent">
                <div className="newsFeed">
                    <div className="newsFeed">
                    </div>


                    {
                        limitedGames.length ?
                            limitedGames.map(game => {
                                return <div className="ScrollingList">

                                    <Card border="info" style={{ width: '14rem' }}>
                                        <Card.Header>{game.winner} just won!</Card.Header>
                                        <Card.Body>
                                            <Card.Title>${game.jackpot.toFixed(2)}</Card.Title>
                                            <img src={horseFace} alt="horse picture" width="100"></img>
                                            <Card.Text>

                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br />

                                    {/* <Card style={{ width: '95%' }}>
                                        <Card.Img variant="top" src={horseFace} height="" width="" />
                                        <Card.Body>
                                            <Card.Title>{game.winner} just won</Card.Title>
                                            <Card.Text>
                                                ${game.jackpot.toFixed(2)}!
                                    </Card.Text>

                                        </Card.Body>
                                    </Card> */}
                                </div>
                            }) : null
                    }
                </div>


            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setGamesNewsFeed: () => dispatch(setGamesNewsFeed()),

})

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftComponentProfile);
