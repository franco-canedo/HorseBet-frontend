import React, { Component } from 'react';
import ProfileHeader from '../ProfileComponents/ProfileHeader.js';
import AllThreeProfile from './AllThreeProfile';

import { connect } from 'react-redux';
import { getProfileFetch } from '../actions';
import { Redirect } from "react-router-dom";


class ProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      user: []

    }
  }

  componentDidMount() {
    this.props.getProfileFetch();
  }


  render() {
    return this.props.isLogged ? (
      <div>
        <ProfileHeader />
        <AllThreeProfile user={this.props.currentUser} />
      </div>
    ) :
      (
        <Redirect to="/" things={this.state} />
      );
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())

})

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    isLogged: state.isLogged
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);