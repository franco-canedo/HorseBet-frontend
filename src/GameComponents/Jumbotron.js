import React, { Component, Fragment } from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import betSizePic from '../Images/chooseBetSize.png';
import chooseHorse from '../Images/chooseHorse.png';
import horseButtons from '../Images/Buttons.png';

class JumbotronComponent extends Component {
    constructor() {
        super()
        this.state = {
            step: 1
        }
    }

    handleInstructionsClick = () => {
        this.setState({
            step: 1
        })
    }

    handleStep2Click = () => {
        this.setState({
            step: 2
        })
    }

    handleStep3Click = () => {
        this.setState({
            step: 3
        })
    }

    renderFirstStep = () => {
        return <Fragment>
            <div className="jumbotron1">
                <div>
                    <h2>Ready to Play?</h2>
                    <p></p>
                    <p>
                        First, choose the amount you want to bet on bottom right corner!
            </p>
                </div>
                <div>
                    <img src={betSizePic} alt="Bet Size" width="200"></img>
                </div>
            </div>
            <p></p>

            <Button onClick={this.handleStep2Click} variant="dark">Step 2</Button>
        </Fragment>
    }

    renderSecondStep = () => {
        return <Fragment>
            <div className="jumbotron1">
                <div>
                    <h2>Step 2</h2>
                    <p></p>
                    <p>
                        Once you've joined a game,
                        choose a horse you want to bet on!
            </p>
                </div>
                <div>
                    <img src={chooseHorse} alt="choose horse" width="300"></img>
                </div>
            </div>
            <p></p>

            <Button onClick={this.handleStep3Click} variant="dark">Step 3</Button>
        </Fragment>
    }

    renderThirdStep = () => {
        return <Fragment>
            <div className="jumbotron1">
                <div>
                    <h2>Step 3</h2>
                    <p></p>
                    <p>
                        Hype the horse you bet on, or Boo others! Each click will increase your bet.
                        Jackpot will be split among players who bet on the winning horse.
            </p>
                </div>
                <div>
                    <img src={horseButtons} alt="horse buttons" width="135"></img>
                </div>
            </div>
            <p></p>


            <Button onClick={this.handleInstructionsClick} variant="dark">Show intructions again.</Button>

        </Fragment>
    }

    render() {
        return (

            <Jumbotron>
                {
                    this.state.step === 1 ? this.renderFirstStep() :
                        this.state.step === 2 ? this.renderSecondStep() :
                            this.renderThirdStep()
                }
            </Jumbotron>


        )
    }
}

export default JumbotronComponent;