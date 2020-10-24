import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";


class Palette extends Component{

    constructor(props){
        super(props);
        this.state={level: 500, foramt: "hex"};
        this.changeLevel=this.changeLevel.bind(this);
        this.changeFormat=this.changeFormat.bind(this);
    }

    changeLevel(level){
        this.setState({level});
    }

    changeFormat(val){
       // alert(val);
        this.setState({foramt: val});
    }
    
    render(){

        const {level,foramt}=this.state;
        const colorBoxes=this.props.palette.colors[this.state.level].map(color => (
            <ColorBox 
            background={color[foramt]}
            name={color.name}
            key={color.id} 
            id={color.id} 
            paletteId={this.props.palette.id}
            showLink={true}
            />
        ));

        return(
            <div className="Palette">
                {/* Navber goes here */}
               <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} hideFromMoreColors={true}/>
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
