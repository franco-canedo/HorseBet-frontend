import React, { Component } from 'react';
import ProfileHeader from '../ProfileComponents/ProfileHeader.js';
import AllThreeProfile from './AllThreeProfile';

class ProfilePage extends Component {


    render() {
      return (
        <div>
           
            <ProfileHeader />
            <AllThreeProfile />
        </div>
      );
    }
  }

export default ProfilePage;