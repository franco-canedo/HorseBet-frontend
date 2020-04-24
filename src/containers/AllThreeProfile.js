import React, { Component } from "react";
import LeftComponentProfile from "../ProfileComponents/LeftComponentProfile";
import RightComponentProfile from "../ProfileComponents/RightComponentProfile";
import CenterComponentProfile from "../ProfileComponents/CenterComponentProfile";

class AllThreeProfile extends Component {
    render() {
        return (
            <div className="AllThree">
                <LeftComponentProfile />
                <CenterComponentProfile user={this.props.user}/>
                <RightComponentProfile />
            </div>
        );
    }
}

export default AllThreeProfile;