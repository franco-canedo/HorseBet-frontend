import React, { Component } from 'react';
import Header from '../components/Header.js';
import CenterComponent from '../components/CenterComponent.js';
import LeftComponent from '../components/LeftComponent.js';
import RightComponent from '../components/RightComponent.js';

class MainPage extends Component {
    constructor() {
        super()
        this.state = {
            form: "demo"
        }
    }


    render() {
      return (
        <div>
           
            <Header />
            <LeftComponent />
            <CenterComponent />
            
            <RightComponent />

        </div>
      );
    }
  }

export default MainPage;