import React, { Component, Fragment } from "react";
import { API_ROOT, HEADERS } from '../constants';

import { connect } from 'react-redux';
import { getProfileFetch } from '../actions';
import CenterComponentGame from "../GameComponents/CenterComponentGame";

class CenterComponentProfile extends Component {
    constructor() {
        super()
        this.state = {
            depositBoolean: false,
            withdrawBoolean: false,
            amount: 0

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
                <p>id: {threeGames[game].id}</p>
                {winners(threeGames[game].game_winners)}
                <p>Jackpot: ${threeGames[game].jackpot}</p>
                <p>Minimum bet: ${threeGames[game].minimum_bet}</p>
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
                    <p>{this.props.user.currentUser.username}</p>
                    <p>{this.props.user.bio}</p>

                    <button>Edit</button>
                    <h4>Recent Games:</h4>
                    {this.renderRecentGames()}

                </div>
                <div className="UserInfoDivs">
                    <h3>Manage Funds:</h3>
                    <h5>You have: ${this.props.user.currentUser.deposit}</h5>
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
                                    <button onClick={this.handleDepositClick}>Deposit</button>
                                    <button onClick={this.handleWithdrawClick}>Withdraw</button>
                                </Fragment>
                    }

                </div>

                <div className="UserInfoDivs">
                    <h3>Stats:</h3>
                    <p>Games Played:{gamesPlayed}</p>
                    <p>Number of wins:{wins}</p>
                    <p>Total Winnings: ${this.props.user.currentUser.winnings}</p>
                    <p>Average jackpot: $</p>
                    {/* {this.props.user.games && this.props.user.games} */}


                </div>

               


            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getProfileFetch: () => dispatch(getProfileFetch())
})

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterComponentProfile);
