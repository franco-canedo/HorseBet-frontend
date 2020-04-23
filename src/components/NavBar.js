import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";


class NavBar extends Component {


    render() {
        return (
            <div>
                <div className="NavBar">
                    <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>
                    <div className="SearchBar">

                    </div>
                    <div className="NavLinks">
                        <button className="ButtonsNavBar">
                            <NavLink to="/main" exact activeStyle={{ color: "blue" }}>
                                Sign Up
          </NavLink></button>
                        <button className="ButtonsNavBar">
                            <NavLink to="/profile" exact activeStyle={{ color: "blue" }}>
                                Log In
          </NavLink></button>

                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;
