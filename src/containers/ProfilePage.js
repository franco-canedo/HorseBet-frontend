import React, { Component } from 'react';
import ProfileHeader from '../ProfileComponents/ProfileHeader.js';
import AllThreeProfile from './AllThreeProfile';

class ProfilePage extends Component {
    constructor() {
        super()
        this.state = {
            user: []

        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/7`)
        .then(resp => resp.json())
        .then(user => this.setState({ user }));
    }


    render() {        
      return (
        <div>
           
            <ProfileHeader />
            <AllThreeProfile user={this.state.user} />
        </div>
      );
    }
  }

export default ProfilePage;