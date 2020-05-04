import React, { Component, Fragment } from "react";
import Table from 'react-bootstrap/Table';
import { API_ROOT } from '../constants';


class Leaderboard extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch(`${API_ROOT}/api/v1/users`)
            .then(resp => resp.json())
            .then(users => {
                console.log(users)
                const sortedUsers = users.sort((a, b) => {
                   return b.number_wins - a.number_wins
                })
                console.log(sortedUsers)
                this.setState({ users: sortedUsers })
            })
    }

    render() {
        return (
            <div className="UserInfoDivs">
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th>Number of wins</th>
                            <th>Total Winnings</th>
                            <th>Games Played</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user => {
                            return <tr>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.number_wins}</td>
                                <td>${user.winnings.toFixed(2)}</td>
                                <td>{user.games.length}</td>
                            </tr>
                        })}


                    </tbody>
                </Table>
            </div>

        );
    }
}

export default Leaderboard;