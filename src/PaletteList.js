import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MiniPalette from './MiniPalette.js';
import {withStyles} from "@material-ui/styles";

const styles={
    root: {
        background: "rgb(142,84,122)",
        background: "linear-gradient(63deg, rgba(142,84,122,0.9542191876750701) 7%, rgba(243,222,247,0) 99%, rgba(104,104,186,1) 100%, rgba(44,48,52,1) 100%)",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems:  "flex-start",
        flexDirection: "columm",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gripGap: "2.5rem",
        
    }
};

class PaletteList extends Component{

    render(){
        const {palettes,classes}=this.props;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palettes.map(palette=>(
                          <Link to={`/palette/${palette.id}`}>
                              <MiniPalette {...palette}/>
                          </Link>
                       ))}
                    </div>
                </div>            
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);