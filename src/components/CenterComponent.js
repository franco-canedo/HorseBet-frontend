import React, { Component } from "react";
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

class CenterComponent extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false
        }
    }

    handleLogIn = () => {
        this.setState({
            loggedIn: true
        })
    }
    render() {
        return (
            <div className="CenterComponent">
                {
                    this.props.form === "signup" ? <SignUpForm login={this.handleLogIn}/> : null
                }
                {
                    this.props.form === "login" ? <LogInForm login={this.handleLogIn}/> : null
                }

                {
                    this.props.form === "demo" ?
                        <button
                            className="ButtonsNavBar"
                            onClick={this.props.signup}>Sign up!</button> : null
                }



            </div>
        );
    }
}

export default CenterComponent;