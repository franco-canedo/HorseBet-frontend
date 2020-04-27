import React, { Component } from "react";

class PureCanvas extends Component {
    shouldComponentUpdate() {
      return false;
    }
  
    render() {
      return (
        <canvas
          width="700"
          height="300"
          ref={node =>
            node ? this.props.contextRef(node.getContext('2d')) : null
          }
        />
      );
    }
  }