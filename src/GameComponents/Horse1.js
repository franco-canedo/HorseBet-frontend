import React, { Component, Fragment } from "react";
import image from '../Images/horseface.png';

class Horse1 extends Component {
    

    
    render() {
        return (
            <Fragment>
                <img ref="image" src={image} className="hidden" />
            </Fragment>
        );
    }
}

export default Horse1;