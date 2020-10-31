import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Link} from "react-router-dom";
import { MenuItem } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styles from "./styles/NavBarStyles";
import { withStyles } from "@material-ui/styles";


class Navbar extends Component{

    constructor(props){
        super(props);
        this.state={foramt: "hex", open: false};
        this.handleChange=this.handleChange.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }

    handleChange(e){
        this.setState({foramt: e.target.value, open: true});
        this.props.handleChange(e.target.value);
    }
 

    handleClose(){
        this.setState({open: false});
    }

    render(){
        const {classes}=this.props;
        return(
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/">ReactColorPicker</Link>
                </div>
                {this.props.hideFromMoreColors && (
                    <div>
                        <span>Level: {this.props.level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={this.props.level}
                                min={100}
                                step={100}
                                max={900}
                                onAfterChange={this.props.changeLevel}
                            />
                    </div>
                </div>
                )}
                <div className={classes.selectContainer}>
                    <Select value={this.state.foramt}  onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    open={this.state.open}
                    anchorOrigin={{vertical: "bottom",horizontal: "left"}}
                    message={<span id="Format Change">Format Change To {this.state.foramt.toUpperCase()} </span>}
                    ContentProps={{"aria-describedby": "message-id"}}
                    autoHideDuration={2000}
                    action={[
                        <IconButton 
                            onClick={this.handleClose}
                            color="inherit" 
                            key='close' 
                            aria-label='close'
                        >
                            <CloseIcon/>
                        </IconButton>
                    ]}
                    onClose={this.handleClose}
                />
            </header>
        );
    }
}

export default withStyles(styles)(Navbar);
