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
        
        this.setState(prevState => ({
            horseSpeed1: prevState.horseSpeed1 + .5,
            horseSpeed2: prevState.horseSpeed2 + .5,
            horseSpeed3: prevState.horseSpeed3 + .5,
            horseSpeed4: prevState.horseSpeed4 + .5,
        }));
        // if(this.props.animation !== null) {
        //     this.props.animation();
        // }
        
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

    // handleBooFromParent = () => {

    //     console.log('booParent?', this.props.booId);
    //     this.setState(prevState => {
    //         return {
    //             horseSpeed1: prevState.horseSpeed1 - 5
    //         }          
    //     })
    // }


    render() {
        const minus1 = this.state.horseSpeed1 - this.props.horses[0].speed;
        const minus2 = this.state.horseSpeed2 - this.props.horses[1].speed;
        const minus3 = this.state.horseSpeed3 - this.props.horses[2].speed;
        const minus4 = this.state.horseSpeed4 - this.props.horses[3].speed;
        // console.log(minus1);
        return (
            <div>
                <Canvas horseSpeed1={minus1}
                    horseSpeed2={minus2}
                    horseSpeed3={minus3}
                    horseSpeed4={minus4}
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