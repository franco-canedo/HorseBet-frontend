import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import Card from 'react-bootstrap/Card';
import horseFace from '../Images/horseface.png'

class LeftComponentProfile extends Component {
    constructor() {
        super()
        this.state = {
            games: []
        }
    }

    componentDidMount = () => {
        fetch(`${API_ROOT}/games`)
            .then(r => r.json())
            .then(games => {
                this.setState({ games })
            })
    }
    
    render() {
        let limitedGames = this.state.games
        limitedGames = limitedGames.splice(0, 2);
        return (
            <div className="LeftComponent">
                <div className="newsFeed">
                    <div className="newsFeed">
                        <h2>News Feed</h2>
                    </div>


                    {
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
                        })
                    }
                </div>


            </div>
        );
    }
}

export default LeftComponentProfile;