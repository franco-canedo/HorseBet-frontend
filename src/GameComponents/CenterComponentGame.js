import React, { Component } from "react";

class CenterComponentGame extends Component {

    render() {

        return (
            <div className="CenterComponentGame">
                <div className="game"></div>
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