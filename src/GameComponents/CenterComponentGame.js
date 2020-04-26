import React, { Component } from "react";
import Canvas from './Canvas';
import Animation from './Animation.js';

class CenterComponentGame extends Component {

    render() {

        return (
            <div className="CenterComponentGame">

                <Animation />
                
                <div className="gameButtonsDiv">
                    <button className="gameButtons">Boo!</button>
                    <button className="gameButtons">Boo!</button>
                    <button className="gameButtons">Hype!</button>
                    <button className="gameButtons">Boo!</button>
                </div>



            </div>
        );
    }
}

export default CenterComponentGame;