import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
//import "./Palette.css";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteStyles";
import PaletteFooter from "./PaletteFooter";


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
        const {colors ,paletteName, emoji ,id}=this.props.palette;
        const { classes } = this.props;
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
            <div className={classes.Palette}>
                {/* Navber goes here */}
               <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} hideFromMoreColors={true}/>
                <div className={classes.colors}>
                {/* bunch of color boxes */}
                    {colorBoxes}
                </div>
                {/* Footer eventually */}
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}
export default withStyles(styles)(Palette);