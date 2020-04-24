import React, { Component } from 'react';
import Header from '../components/Header.js';
import AllThreeMain from './AllThreeMain.js';
import { Redirect } from "react-router-dom";

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            form: "demo",
            loggedIn: false
        }
    }

    handleSignUpClick = () => {
        this.setState({
            form: "signup"
        })
    }

    handleLogInClick = () => {
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
                        signup={this.handleSignUpClick} />


                </div>
            );
    }
}

export default MainPage;