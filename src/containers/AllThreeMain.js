import React, { Component } from "react";
import LeftComponent from "../components/LeftComponent";
import RightComponent from "../components/RightComponent";
import CenterComponent from "../components/CenterComponent";

class AllThree extends Component {
    render() {
        return (
            <div className="AllThree">
                <LeftComponent />
                <CenterComponent form={this.props.form} signup={this.props.signup}/>
                <RightComponent />
            </div>
        );
    }
}

export default AllThree;