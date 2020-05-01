import React, { Component } from 'react';
import Header from '../components/Header.js';
import AllThreeMain from './AllThreeMain.js';
import { Redirect } from "react-router-dom";
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';
import {setGamesNewsFeed} from '../actions'

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            form: "demo",
            loggedIn: false,
            games: []
        }
    }

    componentDidMount = () => {
        this.props.setGamesNewsFeed()
    }

    handleSignUpClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();   
        this.props.setGamesNewsFeed()
        this.setState({
            form: "signup"
        })    
    }

    handleLogInClick = (e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.props.setGamesNewsFeed()
        this.setState({
            form: "login"
        })
    }

    redirectToProfile = () => {
        this.setState({ loggedIn: true });
    }

    render() {
        console.log('rerender?')
        return this.state.loggedIn ? (
            <Redirect to="/profile" things={this.state} />
        ) : (
                <div>
                    <Header signup={this.handleSignUpClick} login={this.handleLogInClick} />
                    <AllThreeMain
                        form={this.state.form}
                        signup={this.handleSignUpClick} 
                        games={this.props.games}
                        />


                </div>
            );
    }
}
const mapDispatchToProps = dispatch => ({
    setGamesNewsFeed: () => dispatch(setGamesNewsFeed()),
   
})

const mapStateToProps = state => {
    return {
        games: state.games
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);