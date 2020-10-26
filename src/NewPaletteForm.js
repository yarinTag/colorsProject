import React, { Component } from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ChromePicker} from "react-color";
import { Button, colors } from "@material-ui/core";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
})


class NewPaletteForm extends Component {
    static defaultProps = {
        maxColors: 20
    };

    constructor(props){
        super(props);
        this.state={
            open: true,
            currentColor: "teal",
            newColorName: "",
            colors: this.props.palettes[0].colors,
            
        }
        this.updateCurrentColor=this.updateCurrentColor.bind(this);
        this.addNewColor=this.addNewColor.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.deleteColor=this.deleteColor.bind(this);
        this.clearPalette=this.clearPalette.bind(this);
        this.addRandomColor=this.addRandomColor.bind(this);
    }

    componentDidMount(){
              // custom rule will have name 'isColorName'
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
         this.state.colors.every(
         ({name}) => name.toLowerCase() !== value.toLowerCase()
         )
        );

        //The color itself is unique
        ValidatorForm.addValidationRule('isColorUnique', value => 
         this.state.colors.every(
         ({color}) => color !== this.state.currentColor
         )
        );

    }

     handleDrawerOpen=() =>{
         this.setState({open: true});
     };

     handleDrawerClose=() =>{
         this.setState({open: false});
     };

     updateCurrentColor(newColor){
         console.log(newColor.hex);
         this.setState({currentColor: newColor.hex});

     }

     addNewColor(){
         const newColor={
             color: this.state.currentColor,
             name: this.state.newColorName
         }
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
                    classes={classes} 
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
                    <Typography variant="h4"> Design Your Palette </Typography>
                    <div>
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
                    <ChromePicker 
                        color={this.state.currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.addNewColor}>
                        <TextValidator
                            value={this.state.newColorName} 
                            name="newColorName"
                            onChange={this.handleChange}
                            validators={["required","isColorNameUnique","isColorUnique"]}
                            errorMessages={["Enter a Color Name","Color name must be Unique","Color already used!"]}
                        />
                        <Button 
                            variant="contained"
                            type="submit"
                            color="primary" 
                            disabled={paletteIsFull}
                            style={{backgroundColor: paletteIsFull ? "grey" : this.state.currentColor}}
                        > 
                            {paletteIsFull ? "Palette Full": "Add Color"}
                        </Button>
                    </ValidatorForm>
                    

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