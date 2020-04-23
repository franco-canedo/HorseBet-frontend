import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <div className="Header" style={{fontStyle: "italic", textAlign: "center"}}>
        
        <div className="NavLinks">
        <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>
                  
                        <button className="ButtonsNavBar">
                            <NavLink to="/signup" exact activeStyle={{ color: "white" }}>
                                Sign Up
          </NavLink></button>
                        <button className="ButtonsNavBar">
                            <NavLink to="/login" exact activeStyle={{ color: "white" }}>
                                Log In
          </NavLink></button>

                    </div>
       
      </div>
    );
  }
}

export default Header;