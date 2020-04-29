import React, { Component } from 'react';
import ProfileHeader from '../ProfileComponents/ProfileHeader.js';
import AllThreeProfile from './AllThreeProfile';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from '../reducers';


const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
class ProfilePage extends Component {
    constructor() {
        super()
        this.state = {
            user: []

        }
    }

    componentDidMount() {
        fetch(`http://localhost:3000/api/v1/users/4`)
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