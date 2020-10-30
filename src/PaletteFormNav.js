import React, { Component } from 'react'
import classNames from "classnames";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, colors } from "@material-ui/core";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import PaletteMetaForm from "./PaletteMetaForm";

const drawerWidth = 400;


const styles = theme => ({

    root:{
        display: "flex"
    },
    hide: {
        display: 'none',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px"
     },
  appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  navBtns: {
    marginRight: "1rem"
  },
  button: {
      margin: "0 0.5rem",
      
  },
  Link: {
      textDecoration: "none"
  }

});


class PaletteFormNav extends Component{
    constructor(props){
        super(props);
        this.state={newPaletteName: "",formShowing: false};
        this.handleChange=this.handleChange.bind(this);
        this.showForm=this.showForm.bind(this);
        this.hideForm=this.hideForm.bind(this);
    }

    handleChange(evt){
         this.setState({
             [evt.target.name]: evt.target.value
         });
     }

    showForm() {
        this.setState({formShowing: true});
     }

     hideForm(){
         this.setState({formShowing: false});
     }

    render(){
        const {classes , open, palettes, handleSubmit }=this.props;
        const {newPaletteName}=this.state;
        return(
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    color="default"
                    className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={this.props.handleDrawerOpen}
                        edge="start"
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                  
                    </Toolbar>
                      <div className={classes.navBtns}>
                            <Link to="/" className={classes.Link}>
                                <Button variant="contained" color="secondary" className={classes.button}>Go-Back</Button>
                            </Link>
                             <Button variant="contained" color="primary" onClick={this.showForm} className={classes.button}>
                                Save
                             </Button>
                    </div>
                </AppBar>
                {this.state.formShowing && (<PaletteMetaForm palettes={palettes} handleSubmit={handleSubmit} hideForm={this.hideForm}/>
                )}

            </div>
        )
    }

}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);