import React, { Component } from "react";
import { connect } from 'react-redux';
import { userLoginFetch } from '../actions';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };


    handleSubmit = event => {
        event.preventDefault()
        this.props.userLoginFetch(this.state)
        this.setState({
            username: "",
            password: "",
        })
    }

    render() {
        return this.props.isLogged ? (
            <Redirect to="/profile" things={this.state} />) : (
                <div >
                    <div className="SpacingDiv">
                        <div className="UserProfile">
                           <Form>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="username"
                                    value={this.state.username} type="username" placeholder="Enter username" />
    
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="email"
                                    value={this.state.email} type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="password"
                                    value={this.state.password} type="password" placeholder="Password" />
                                </Form.Group>

                                <Button onClick={this.handleSubmit} variant="dark" type="submit">
                                    Log In
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>

            )

    }
}

const mapDispatchToProps = dispatch => ({
    userLoginFetch: userInfo => dispatch(userLoginFetch(userInfo))
})

const mapStateToProps = state => {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInForm);