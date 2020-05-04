import React, { Component } from "react";
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';
import Button from 'react-bootstrap/Button';


class CenterComponent extends Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false
        }
    }

    handleLogIn = () => {
        this.setState({
            loggedIn: true
        })
    }
    render() {
        return (
            <div className="CenterComponent">
               <iframe src="https://giphy.com/embed/Yqhmj4zeFNFjMH4Fcy" width="600" height="300" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/Yqhmj4zeFNFjMH4Fcy">via GIPHY</a></p>
                {/* <div style="width:100%;height:0;padding-bottom:38%;position:relative;"><iframe src="https://giphy.com/embed/Y1eCnkOeC3QaV3e0dV" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/Y1eCnkOeC3QaV3e0dV">via GIPHY</a></p> */}
                {
                    this.props.form === "signup" ? <SignUpForm login={this.handleLogIn}/> : null
                }
                {
                    this.props.form === "login" ? <LogInForm login={this.handleLogIn}/> : null
                }

                {
                    this.props.form === "demo" ? 
                    <Button variant="danger" size="lg" onClick={this.props.signup}>Sign Up!</Button> : null
                        // <button
                        //     className="ButtonsNavBar"
                        //     onClick={this.props.signup}>Sign up!</button> : null
                }



            </div>
        );
    }
}

export default CenterComponent;