import React, { Component } from "react";
import Canvas from './Canvas';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
import { connect } from 'react-redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';

//import Popover from 'react-bootstrap/Popover';
// import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class Animation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            horseSpeed1: 10,
            horseSpeed2: 10,
            horseSpeed3: 10,
            horseSpeed4: 10,
            popoverOpen: false,
            targedId: 0
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
    }

    toggle = () => {
        this.setState(prevState => {
            return {
                popoverOpen: !prevState.popoverOpen
            }
        })
    }


    render() {
        const minus1 = this.state.horseSpeed1 - this.props.horses[0].speed;
        const minus2 = this.state.horseSpeed2 - this.props.horses[1].speed;
        const minus3 = this.state.horseSpeed3 - this.props.horses[2].speed;
        const minus4 = this.state.horseSpeed4 - this.props.horses[3].speed;
        // console.log(minus1);
        const triggers = ['hover', 'focus'];
        return (
            <div>
                <Canvas horseSpeed1={minus1}
                    horseSpeed2={minus2}
                    horseSpeed3={minus3}
                    horseSpeed4={minus4}
                    boo={this.boo} />
                <div className="gameButtonsDiv">
                    {this.props.activeGame.activeGame.users.map(user => {

                        return <div className="gameButtons">
                        <OverlayTrigger trigger={triggers} placement="bottom" overlay={popover(user)}>
                            <Button variant="light">{user.username}</Button>
                        </OverlayTrigger>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        horses: state.horses,
        activeGame: state.activeGame,
    }
}

export default connect(mapStateToProps, null)(Animation);

const popover = (user) => {
    return <Popover id="popover-basic">
        <Popover.Title as="h3">Stats:</Popover.Title>
        <Popover.Content>
            <li>Games Won: {user.number_wins}</li>
            <li>Winnings: ${user.winnings}</li>
            <li>Joined in {user.created_at}</li>
        </Popover.Content>
    </Popover>
}



