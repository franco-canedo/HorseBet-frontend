import React, { Component, Fragment } from "react";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CenterComponentProfile from './CenterComponentProfile';
import Leaderboard from './Leaderboard';



class TabContainer extends Component {
    constructor() {
        super()
        this.state = {
            key: 'profile'
        }
    }

    handleTabClick = (k) => {
        this.setState({
            key: k
        })
    }

    render() {
        return (
            <div className="CenterComponentProfile">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={this.state.key}
                    onSelect={(k) => this.handleTabClick(k)}
                >
                    <Tab eventKey="profile" title="Profile">
                       <CenterComponentProfile user={this.props.user}/>
                    </Tab>
                    <Tab eventKey="leaderboard" title="Leaderboard">
                        <Leaderboard />
                    </Tab>
                    
                </Tabs>
            </div>
           
        );
    }
}

export default TabContainer;