import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class Header extends Component {
    render() {
        return (
            <div className="Header" style={{ fontStyle: "italic", textAlign: "center" }}>

                <div className="NavLinks">
                    <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>
                    <Button variant="dark" size="lg" onClick={this.props.signup}>Sign Up</Button>{' '}
                    <Button variant="dark" size="lg" onClick={this.props.login}>Log In</Button>{' '}
                    {/* <button className="ButtonsNavBar" onClick={this.props.signup}>Sign Up</button>
                    <button className="ButtonsNavBar" onClick={this.props.login}>Log In</button> */}

                </div>

            </div>
        );
    }
}

export default Header;