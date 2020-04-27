import React, { Component } from "react";
import Animation from './Animation.js';

class CenterComponentGame extends Component {

    render() {

        return (
            <div className="CenterComponentGame">
                <Animation horseSpeed1={this.props.horseSpeed1}
                    horseSpeed2={this.props.horseSpeed2}
                    horseSpeed3={this.props.horseSpeed3}
                    horseSpeed4={this.props.horseSpeed4} 
                    animation={this.props.animation}/>
            </div>
        );
    }
}

export default CenterComponentGame;