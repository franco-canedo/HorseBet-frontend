import React, { Component } from 'react';
import { API_ROOT } from '../constants';
import Card from 'react-bootstrap/Card';
import horseFace from '../Images/horseface.png'

class LeftComponent extends Component {
    render() {
        let limitedGames = this.props.games
        limitedGames = limitedGames.splice(0, 3);
        return (
            <div className="LeftComponent">
                <div className="newsFeed">
                    <div className="newsFeed">

                    </div>
                    {
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

                                {/* <Card style={{ width: '80%' }}>
                                    <Card.Img variant="top" src={horseFace} height="120" width="200" />
                                    <Card.Body>
                                        <Card.Title>{game.winner} just won</Card.Title>
                                        <Card.Text>
                                            ${game.jackpot.toFixed(2)}!
                                    </Card.Text>

                                    </Card.Body>
                                </Card> */}
                            </div>
                        })
                    }
                </div>


            </div>
        );
    }
}

export default LeftComponent;