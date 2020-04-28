import React, { Component } from "react";
import horse from '../Images/horseface.png'
import PureCanvas from './PureCanvas.js'
import Horse1 from './Horse1.js';

class Canvas extends Component {
    constructor() {
        super()
        this.canvasRef = React.createRef();
        
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        const ctx = canvas.getContext("2d")
        const img = this.refs.image

        img.onload = () => {
            ctx.drawImage(img, 10, 13, 50, 50)
            ctx.drawImage(img, 10, 88, 50, 50)
            ctx.drawImage(img, 10, 163, 50, 50)
            ctx.drawImage(img, 10, 238, 50, 50)

        }

        ctx.beginPath();
        ctx.moveTo(0, 75);
        ctx.lineTo(600, 75);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 150);
        ctx.lineTo(600, 150);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 225);
        ctx.lineTo(600, 225);
        ctx.stroke();

        ctx.fillRect(620, 15, 50, 270);
    }

    componentDidUpdate() {
        const speed = this.props.horseSpeed1;
        const speed2 = this.props.horseSpeed2;
        const speed3 = this.props.horseSpeed3;
        const speed4 = this.props.horseSpeed4;
        // console.log(speed2)
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = this.refs.image;

        ctx.save();
        ctx.beginPath();
        ctx.drawImage(img, speed < 600 ? speed : 600, 13, 50, 50)
        ctx.drawImage(img, speed2 < 600 ? speed : 600, 88, 50, 50)
        ctx.drawImage(img, speed3 < 600 ? speed : 600, 163, 50, 50)
        ctx.drawImage(img, speed4 < 600 ? speed : 600, 238, 50, 50)
        ctx.restore();
      }


    render() {
        return (
            <div>
                <img alt="text" ref="image" src={horse} className="hidden" />
                <canvas className="canvas" ref={this.canvasRef} width={700} height={300} />
            </div>
        );
    }
}

export default Canvas;