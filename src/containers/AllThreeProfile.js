import React, { Component } from "react";
import LeftComponentProfile from "../ProfileComponents/LeftComponentProfile";
import RightComponentProfile from "../ProfileComponents/RightComponentProfile";
import CenterComponentProfile from "../ProfileComponents/CenterComponentProfile";
import Footer from '../components/Footer';
import TabContainer from '../ProfileComponents/TabContainer';

class AllThreeProfile extends Component {
    render() {
        return (
            <div className="AllThree">
                <LeftComponentProfile />
                {/* <CenterComponentProfile user={this.props.user}/> */}
                <TabContainer user={this.props.user}/>
                {/* <RightComponentProfile /> */}
                <Footer />
            </div>
        );
    }
}

export default AllThreeProfile;