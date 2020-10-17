import React from 'react'
import {withStyles} from "@material-ui/styles";
import { colors } from '@material-ui/core';


const styles={
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        marginBottom: "30px",
        marginLeft: "15px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover": {
            opacity: 1
        }
    },
    colors: {
        backgroundColor: "gray",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
    },
    title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji: {    
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    }
}

function MiniPalette(props){
    
    const {classes,paletteName,emoji, colors}=props;
    const miniColorBoxes=colors.map(color=>(
        <div className={classes.miniColor} style={{backgroundColor: color.color}}
        key={color.name}
        />
    ));
    return(
        <div className={classes.root}>
            <div className={classes.colors}>
                {/*Mini Color Boxes*/}
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span></h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);