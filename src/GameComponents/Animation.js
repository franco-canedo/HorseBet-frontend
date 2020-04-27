import React, { Component } from "react";
import Canvas from './Canvas';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            horseSpeed1: 10,
            horseSpeed2: 10,
            horseSpeed3: 10,
            horseSpeed4: 10,
        }
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    updateAnimationState() {
        //GET speed
        // setState = speed
        // speed += 1
        //POST speed 
        // this.setState(prevState => ({
        //     horseSpeed1: prevState.horseSpeed1 + .5,
        //     horseSpeed2: prevState.horseSpeed2 + .5,
        //     horseSpeed3: prevState.horseSpeed3 + .5,
        //     horseSpeed4: prevState.horseSpeed4 + .5,
        // }));
        this.props.animation();
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    boo = (event) => {
       console.log("boo?");
       const body = {
           game_id: 1,
           horse_id: 2
       }
       fetch(`${API_ROOT}/boo`, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(body)
      });

        // this.setState(prevState => {
        //     return {
        //         horseSpeed1: prevState.horseSpeed1 - 5
        //     }
        // })
    }

    render() {
        return (
            <div>
                <Canvas horseSpeed1={this.props.horseSpeed1}
                    horseSpeed2={this.props.horseSpeed2}
                    horseSpeed3={this.props.horseSpeed3}
                    horseSpeed4={this.props.horseSpeed4}
                    boo={this.boo} />
                <div className="gameButtonsDiv">
                    <button className="gameButtons" onClick={this.boo}>Boo!</button>
                    <button className="gameButtons" onClick={this.boo}>Boo!</button>
                    <button className="gameButtons" onClick={this.boo}>Hype!</button>
                    <button className="gameButtons" onClick={this.boo}>Boo!</button>
                </div>
            </div>
        );
    }
}

export default Animation;