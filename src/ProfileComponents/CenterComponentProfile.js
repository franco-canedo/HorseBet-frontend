import React, { Component, Fragment } from "react";
import { API_ROOT, HEADERS } from '../constants';

import { connect } from 'react-redux';
import { getProfileFetch } from '../actions';
import {setGamesNewsFeed} from '../actions'
import CenterComponentGame from "../GameComponents/CenterComponentGame";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

class CenterComponentProfile extends Component {
    constructor() {
        super()
        this.state = {
            depositBoolean: false,
            withdrawBoolean: false,
            amount: 0,
            editUsername: false,
            usernameField: "",

        }
    }

    handleDepositClick = () => {
        this.setState(prevState => {
            return {
                depositBoolean: !prevState.depositBoolean
            }
        })
    }

    handleWithdrawClick = () => {
        this.setState(prevState => {
            return {
                withdrawBoolean: !prevState.withdrawBoolean
            }
        })
    }

    handleBackClick = () => {
        this.setState(prevState => {
            return {
                depositBoolean: false,
                withdrawBoolean: false
            }
        })
    }

    handleChange = (event) => {
        this.setState({
            amount: event.target.value
        })
    }

    handleDepositSubmit = (event) => {
        this.setState({
            amount: ""
        })
        event.preventDefault()
        alert('deposit submitted');
        const body = {
            id: this.props.currentUser.currentUser.id,
            amount: parseInt(this.state.amount, 10)
        }

        const configObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)

        }
        fetch(`${API_ROOT}/api/v1/users/deposit`, configObj)
            .then(r => r.json())
            .then(json => {
                console.log(json)
                this.props.setGamesNewsFeed();
                this.props.getProfileFetch();
            })
    }

    handleWithdrawSubmit = (event) => {
        this.setState({
            amount: ""
        })
        event.preventDefault()
        alert('withdraw submitted');

        const body = {
            id: this.props.currentUser.currentUser.id,
            amount: parseInt(this.state.amount, 10)
        }
        

        const configObj = {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(body)

        }
        fetch(`${API_ROOT}/api/v1/users/withdraw`, configObj)
            .then(r => r.json())
            .then(json => {
                console.log(json)
                this.props.setGamesNewsFeed();
                this.props.getProfileFetch();
            })
    }

    handleEditClick = () => {
        this.setState(prevState => {
            return {
                editUsername: !prevState.editUsername
            }
            
        })
    }

    handleEditChange = (event) => {
        this.setState({
            usernameField: event.target.value
        })
    }

    handleEditName = (event) => {
        this.setState({
            usernameField: "",
            editUsername: false
        })
        event.preventDefault()
        alert('edit submitted');

        const body = {
            id: this.props.currentUser.currentUser.id,
            username: this.state.usernameField
        }
        

        const configObj = {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify(body)

        }
        fetch(`${API_ROOT}/api/v1/users/edit`, configObj)
            .then(r => r.json())
            .then(json => {
                console.log(json)
                this.props.setGamesNewsFeed();
                this.props.getProfileFetch();
            })
    }


    renderRecentGames = () => {
        const winners = (gameWinners) => {
            // console.log(gameWinners)
            // let obj = threeGames[game].game_winners;
            for (const winner in gameWinners) {
                return <p>winner:{gameWinners[winner].user.currentUser.username}</p>
            }
        }
        let threeGames = this.props.user.currentUser.games
        for (const game in threeGames) {

            return <div>
                <ul>
                    <li>winner: {threeGames[game].winner}</li>
                    {winners(threeGames[game].game_winners)}
                    <li>Jackpot: ${threeGames[game].jackpot.toFixed(2)}</li>
                    <li>Minimum bet: ${threeGames[game].minimum_bet}</li>
                </ul>
            </div>
        }
    }

    render() {
        let array = this.props.user.currentUser.games;
        let gamesPlayed = 0;
        for (const game in array) {
            gamesPlayed = gamesPlayed + 1;
        }

        let array2 = this.props.user.currentUser.game_winners;
        let wins = 0
        for (const game in array2) {
            wins = wins + 1;
        }

        return (
            <div className="CenterComponentProfile">
                 <div className="UserInfoDivs">
                    <h3>Profile Info:</h3>
                    <p>Username: {this.props.user.currentUser.username}</p>
                    <p>{this.props.user.bio}</p>
                    {
                        this.state.editUsername ? 
                        <Fragment>
                                <form onSubmit={this.handleEditName}>
                                    <label>Enter new username</label>
                                    <input className="MeetupForm"
                                        type="text"
                                        name="username"
                                        value={this.state.usernameField}
                                        onChange={this.handleEditChange}
                                    ></input>
                                    <input type="submit"></input>
                                </form>
                                
                            </Fragment> :
                             <Button variant="light" size="sm" onClick={this.handleEditClick}>Edit</Button>
                    }

                   
                   <p></p>
                    <h4>Most Recent Game:</h4>
                    {this.renderRecentGames()}

                </div>
                <div className="UserInfoDivs">
                    <h3>Manage Funds:</h3>
                    <h5>You have: ${this.props.user.currentUser.deposit.toFixed(2)}</h5>
                    {
                        this.state.depositBoolean ?
                            <Fragment>
                                <form onSubmit={this.handleDepositSubmit}>
                                    <label>Enter deposit $</label>
                                    <input className="MeetupForm"
                                        type="text"
                                        name="deposit"
                                        value={this.state.amount}
                                        onChange={this.handleChange}
                                    ></input>
                                    <input type="submit"></input>
                                </form>
                                <button onClick={this.handleBackClick}>Back</button>
                            </Fragment>
                            : this.state.withdrawBoolean ?
                                <Fragment>
                                    <form onSubmit={this.handleWithdrawSubmit}>
                                        <label>Enter withdraw $</label>
                                        <input className="MeetupForm"
                                            type="text"
                                            name="deposit"
                                            value={this.state.amount}
                                            onChange={this.handleChange}
                                        ></input>
                                        <input type="submit"></input>
                                    </form>
                                    <button onClick={this.handleBackClick}>Back</button>
                                </Fragment>
                                :
                                <Fragment>
                                    <Button variant="primary" size="sm" onClick={this.handleDepositClick}>Deposit</Button>
                                    <Button variant="light" size="sm" onClick={this.handleWithdrawClick}>Withdraw</Button>
                                </Fragment>
                    }

                </div>

                <div className="UserInfoDivs">
                    <h3>Stats:</h3>
                    <ul>
                        <li>Games Played: {gamesPlayed}</li>
                        <li>Number of wins: {wins}</li>
                        <li>Total Winnings: ${this.props.user.currentUser.winnings.toFixed(2)}</li>
                    </ul>
                    {/* <p>Games Played:{gamesPlayed}</p>
                    <p>Number of wins:{wins}</p>
                    <p>Total Winnings: ${this.props.user.currentUser.winnings}</p>
                    <p>Average jackpot: $</p> */}
                    {/* {this.props.user.games && this.props.user.games} */}


                </div>

               


            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch()),
    setGamesNewsFeed: () => dispatch(setGamesNewsFeed()),
})

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterComponentProfile);
