import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
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

        const {level}=this.state;
        const colorBoxes=this.props.palette.colors[this.state.level].map(color => (
            <ColorBox background={color.hex} name={color.name} />
        ));
        return(
            <div className="Palette">
                {/* Navber goes here */}
               <Navbar level={level} changeLevel={this.changeLevel}/>
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
