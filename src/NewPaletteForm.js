import React, { Component } from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Button, colors } from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container:{
    width: "100%",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  buttons:{

  }

});


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    };

    constructor(props){
        super(props);
        this.state={
            open: true,
            currentColor: "teal",
            colors: this.props.palettes[0].colors,
            
        }
        this.addNewColor=this.addNewColor.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.deleteColor=this.deleteColor.bind(this);
        this.clearPalette=this.clearPalette.bind(this);
        this.addRandomColor=this.addRandomColor.bind(this);
    }

     handleDrawerOpen=() =>{
         this.setState({open: true});
     };

     handleDrawerClose=() =>{
         this.setState({open: false});
     };

     addNewColor(newColor){
         
         this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
     }

     handleChange(evt){
         this.setState({
             [evt.target.name]: evt.target.value
         });
     }

     handleSubmit(newPaletteName){
         const newPalette={
             paletteName: newPaletteName,
             id: newPaletteName.toLocaleLowerCase().replace(/ /g,"-"),
             colors: this.state.colors
         };
         this.props.savePalette(newPalette);
         this.props.history.push("/");
     }

     deleteColor(colorName){
         this.setState({
             colors: this.state.colors.filter(color=>color.name !== colorName)
         });
     }

     onSortEnd = ({oldIndex , newIndex}) => {
         this.setState(({colors}) => ({
             colors: arrayMove(colors, oldIndex,newIndex)
         }));
     }

     clearPalette(){
         this.setState({colors: [] });
     }

    addRandomColor(){
        //pick random color from existing palettes
        const allcolors=this.props.palettes.map(p=>p.colors).flat();
        var rand=Math.floor(Math.random() * allcolors.length);
        const randomColor= allcolors[rand];
        this.setState({colors: [...this.state.colors ,randomColor]});
        //console.log(allcolors);
    }
   
     render(){
         const {classes, theme, maxColors,palettes}=this.props;
         const {open, colors}=this.state;
         const paletteIsFull = colors.length>=maxColors;
         return(
            <div className={classes.root}>
                <PaletteFormNav 
                    opem={open} 
                    palettes={palettes} 
                    handleSubmit={this.handleSubmit}
                    handleDrawerOpen={this.handleDrawerOpen}
                    />
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <div className={classes.container}>
                    <Typography variant="h4"> Design Your Palette </Typography>
                    <div className={classes.buttons}>
                        <Button
                            variant="contained" 
                            color="secondary" 
                            onClick={this.clearPalette}
                            > Clear Button </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.addRandomColor}
                            disabled={paletteIsFull}
                            > Random Color </Button>
                    </div>
                    <ColorPickerForm 
                        paletteIsFull={paletteIsFull} 
                        addNewColor={this.addNewColor}
                        colors={colors}
                    />
                  </div>
                </Drawer>
                <main
                    className={classNames(classes.content, {
                    [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <DraggableColorList 
                        colors={colors} 
                        deleteColor={this.deleteColor}
                        axis="xy"
                        onSortEnd={this.onSortEnd}
                    />
                </main>
            </div>
     );}
 }
export default withStyles(styles, { withTheme: true })(NewPaletteForm);