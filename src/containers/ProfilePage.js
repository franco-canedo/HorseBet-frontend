import React, { Component } from 'react';
import ProfileHeader from '../ProfileComponents/ProfileHeader.js';
import AllThreeProfile from './AllThreeProfile';

import { connect } from 'react-redux';
import { getProfileFetch } from '../actions';


class ProfilePage extends Component {
  constructor() {
    super()
    this.state = {
      user: []

    }
  }

  componentDidMount() {
    // fetch(`http://localhost:3000/api/v1/users/10`)
    //   .then(resp => resp.json())
    //   .then(user => this.setState({ user }));
    this.props.getProfileFetch();
  }


  render() {
    return (
      <div>

        <ProfileHeader />

        <AllThreeProfile user={this.props.currentUser} />

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);