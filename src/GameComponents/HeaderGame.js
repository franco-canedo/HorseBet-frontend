import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class HeaderGame extends Component {
  render() {
    return (
      <div className="Header" style={{fontStyle: "italic", textAlign: "center"}}>
        
        <div className="NavLinks">
        <div className="Logo">
                        <h1>HorseBet</h1>
                    </div>
                    <Button variant="dark" size="lg">
                    <NavLink to="/profile" exact activeStyle={{ color: "white" }}>
                                Profile
                        </NavLink>
                      </Button>{' '}
                        {/* <button className="ButtonsNavBar" >
                            <NavLink to="/profile" exact activeStyle={{ color: "white" }}>
                                Profile
                        </NavLink></button> */}
                        

                    </div>
       
      </div>
    );
  }
}

export default HeaderGame;