import React, { Component } from "react";
import horse from '../Images/horseface.png'

class Canvas extends Component {
    constructor() {
        super()
        this.state = {
            horse1: 10,
            horse2: 10,
            horse3: 10,
            horse4: 10,
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas
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

    startGame = () => {

    }

    render() {
        return (
            <div>
                <img alt="text" ref="image" src={horse} className="hidden" />
                <canvas className="canvas" ref="canvas" width={700} height={300} />
                <button>start</button>
                
            </div>
        );
    }
}

export default Canvas;