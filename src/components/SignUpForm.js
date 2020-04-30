import React, { Component } from "react";
import { connect } from 'react-redux';
import { userPostFetch } from '../actions';
import { Redirect } from "react-router-dom";


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault()
    this.props.userPostFetch(this.state)
    this.setState({
      username: "",
      password: "",
    })
  }

  render() {
    return  this.props.isLogged ? (
      <Redirect to="/profile" things={this.state} />) : (
      <div >
        <div className="SpacingDiv">
          <div className="UserProfile">
            <form className="OutsideForm" onSubmit={this.handleSubmit}>
              <h1>Sign Up</h1>
              <label>Username</label>
              <input className="MeetupForm"
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              ></input>
              <br />
              <label>Password</label>
              <input className="MeetupForm"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              ></input>


              <br />
              <br />
              <br />
              <input type="submit" className="ButtonsNavBar"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: userInfo => dispatch(userPostFetch(userInfo))
})

const mapStateToProps = state => {
  return {
      isLogged: state.isLogged
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);