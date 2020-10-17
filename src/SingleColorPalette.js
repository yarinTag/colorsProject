import React, { Component } from 'react'
import ColorBox from "./ColorBox";

class SingleColorPalette extends Component{
    constructor(props){
        super(props);
        this._shades=this.gatherShades(this.props.palette,this.props.colorId);
    }
    gatherShades(palette,colorToFilterBy){
        let shades=[];
        let allColors=palette.colors;

        for(let key in allColors){
        {/* Return all shades of given color */}
            shades=shades.concat(
                allColors[key].filter(color=>color.id===colorToFilterBy)
            );
        }
        return shades.slice(1);
    }
    render(){
        const colorBoxes=this._shades.map(color => (
            <ColorBox key={color.id} name={color.name} color={color.hex} showLink={false}/>
        ));
        return(
            <div>
                <h1>Single Color Palette</h1>
                <div>
                    {colorBoxes}
                </div>
            </div>
        );
    }
}

export default SingleColorPalette;