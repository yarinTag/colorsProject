import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from "react-sortable-hoc";


const styles={
    root: {
        width: "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color:"white",
            transform: "scale(1.4)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0px",
        padding: "10px",
        bottom: "0px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between"
    },
    deleteIcon: {
        color: "black",
        transition: "all 0.3s ease-in-out"
    }
};
 const DraggableColorBox = SortableElement((props) =>{
     const {classes}=props;
    return(
        <div 
            className={classes.root}
            style={{backgroundColor: props.color}}
        >
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={props.handleClick}/>
            </div>
        </div>
    );
})

export default withStyles(styles)(DraggableColorBox);