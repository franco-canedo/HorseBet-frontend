import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class ProfileHeader extends Component {
  render() {
    return (
      <div className="Header" style={{fontStyle: "italic", textAlign: "center"}}>
        
        <div className="NavLinks">
        <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>
                  
                        <button className="ButtonsNavBar">
                            <NavLink to="/main" exact activeStyle={{ color: "white" }}>
                                Profile
          </NavLink></button>
                        <button className="ButtonsNavBar">
                            <NavLink to="/logout" exact activeStyle={{ color: "white" }}>
                                Log Out
          </NavLink></button>

                    </div>
       
      </div>
    );
  }
}

export default ProfileHeader;