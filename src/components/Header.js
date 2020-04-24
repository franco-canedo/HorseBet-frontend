import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="Header" style={{ fontStyle: "italic", textAlign: "center" }}>

                <div className="NavLinks">
                    <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>

                    <button className="ButtonsNavBar" onClick={this.props.signup}>Sign Up</button>
                    <button className="ButtonsNavBar" onClick={this.props.login}>Log In</button>

                </div>

            </div>
        );
    }
}

export default Header;