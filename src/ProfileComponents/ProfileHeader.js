import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { API_ROOT } from '../constants';
import { connect } from 'react-redux';
import { getProfileFetch, logoutUser, loggedOut } from '../actions';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';

class ProfileHeader extends Component {
  handleClick = event => {

    event.preventDefault()
    // Remove the token from localStorage
    localStorage.removeItem("token")
    // Remove the user object from the Redux store
    this.props.logoutUser()
    this.props.loggedOut()
    alert('You have logged out, redirecting');
  }

  render() {
    return (
      <div className="Header" style={{ fontStyle: "italic", textAlign: "center" }}>

        <div className="NavLinks">
          <div className="Logo">
            <h1>HorseBet</h1>
          </div>
          <Button variant="light" size="lg">
            <NavLink to="/game" exact activeStyle={{ color: "white" }}>
              Play!
                        </NavLink>
          </Button>
          <Button onClick={this.handleClick} size="lg" variant="dark">Log Out</Button>{' '}

        </div>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  isLogged: state.isLogged
})

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  logoutUser: () => dispatch(logoutUser()),
  loggedOut: () => dispatch(loggedOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);

