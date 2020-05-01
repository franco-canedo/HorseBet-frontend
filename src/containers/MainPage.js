import React, { Component } from 'react';
import Header from '../components/Header.js';
import AllThreeMain from './AllThreeMain.js';
import { Redirect } from "react-router-dom";
import { API_ROOT } from '../constants';

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            form: "demo",
            loggedIn: false,
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

    handleSignUpClick = (e) => {
        
        e.preventDefault();
        this.setState({
            form: "signup"
        })
    }

    handleLogInClick = (e) => {
        e.preventDefault();
        this.setState({
            form: "login"
        })
    }

    redirectToProfile = () => {
        this.setState({ loggedIn: true });
    }

    render() {
        return this.state.loggedIn ? (
            <Redirect to="/profile" things={this.state} />
        ) : (
                <div>
                    <Header signup={this.handleSignUpClick} login={this.handleLogInClick} />
                    <AllThreeMain
                        form={this.state.form}
                        signup={this.handleSignUpClick} 
                        games={this.state.games}
                        />


                </div>
            );
    }
}

export default MainPage;