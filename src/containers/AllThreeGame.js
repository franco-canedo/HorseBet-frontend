import React, { Component } from "react";
import LeftComponentGame from "../GameComponents/LeftComponentGame";
import RightComponentGame from "../GameComponents/RightComponentGame";
import CenterComponentGame from "../GameComponents/CenterComponentGame";
import Footer from '../components/Footer';

class AllThreeGame extends Component {
    render() {
        return (
            <div className="AllThree">
                <LeftComponentGame />
                <CenterComponentGame user={this.props.user}/>
                <RightComponentGame />
                <Footer />
            </div>
        );
    }
}

export default AllThreeGame;