import React, { Component } from "react";
import { connect } from 'react-redux';
import { userLoginFetch } from '../actions';

class LogInForm extends Component {
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

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     const body = this.state;

    //     const configObj = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //         },
    //         body: JSON.stringify(body),
    //     };

    //     fetch('http://localhost:3000/api/v1/login', configObj)
    //         .then(r => r.json())
    //         .then(console.log)

    //     // fetch('http://localhost:3000/api/v1/profile', {
    //     //     method: 'GET',
    //     //     headers: {
    //     //         Authorization: `Bearer <token>`
    //     //     }
    //     // })

    // };

    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
        this.setState({
            username: "",
            password: "",
        })
    }

    render() {
        return (
            <div >
                <div className="SpacingDiv">
                    <div className="UserProfile">
                        <form className="OutsideForm" onSubmit={this.handleSubmit}>
                            <h1>Log In</h1>
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
                                type="text"
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
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

export default connect(null, mapDispatchToProps)(LogInForm);