import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import Card from 'react-bootstrap/Card';
import horseFace from '../Images/horseface.png';
import { connect } from 'react-redux';
import {setGamesNewsFeed} from '../actions'

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
        limitedGames = limitedGames.splice(0, 2);
        return (
            <div className="LeftComponent">
                <div className="newsFeed">
                    <div className="newsFeed">
                        <h2>News Feed</h2>
                    </div>


                    {
                        limitedGames.length ?
                            limitedGames.map(game => {
                                return <div className="newsFeed">

                                    <Card style={{ width: '95%' }}>
                                        <Card.Img variant="top" src={horseFace} height="" width="" />
                                        <Card.Body>
                                            <Card.Title>{game.winner} just won</Card.Title>
                                            <Card.Text>
                                                ${game.jackpot.toFixed(2)}!
                                    </Card.Text>

                                        </Card.Body>
                                    </Card>
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
