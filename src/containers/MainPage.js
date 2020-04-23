import React, { Component } from "react";
import NavBar from '../components/NavBar.js';
import Footer from '../components/NavBar.js';
import Header from '../components/Header.js';


class MainPage extends Component {
    constructor() {
        super();

        this.state = {
            center: "demo"
        }
    }

    
    
  
    render() {
      return (
        <div>
           
            <Header />
          

        </div>
      );
    }
  }
  
  export default MainPage;