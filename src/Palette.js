import React, { Component } from "react";
import ColorBox from "./ColorBox";
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import "./Palette.css";


class Palette extends Component{

    constructor(props){
        super(props);
        this.state={level: 500};
        this.changeLevel=this.changeLevel.bind(this);
    }

    changeLevel(level){
        this.setState({level});
    }

    render(){
   
        const colorBoxes=this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return(
            <div className="Palette">
                <div className="Slider">
                {/* Navber goes here */}
                <Slider 
                    defaultValue={this.state.level}
                    min={100}
                    step={100}
                    max={900}
                    onAfterChange={this.changeLevel}
                />
                </div>
                <div className="Palette-colors">
                {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* Footer eventually */}
                
            </div>
        );
    }
}
export default Palette;
