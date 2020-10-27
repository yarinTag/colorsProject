import React, { Component } from 'react'
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

class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state={
            currentColor: "teal",
            newColorName: ""
        };
        this.updateCurrentColor=this.updateCurrentColor.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

    }

    componentDidMount(){
              // custom rule will have name 'isColorName'
        ValidatorForm.addValidationRule('isColorNameUnique', value => 
         this.props.colors.every(
         ({name}) => name.toLowerCase() !== value.toLowerCase()
         )
        );

        //The color itself is unique
        ValidatorForm.addValidationRule('isColorUnique', value => 
         this.props.colors.every(
         ({color}) => color !== this.state.currentColor
         )
        );

    }

    updateCurrentColor(newColor){
         console.log(newColor.hex);
         this.setState({currentColor: newColor.hex});

     }

     handleChange(evt){
         this.setState({
             [evt.target.name]: evt.target.value
         });
     }

     handleSubmit(){
         const newColor={
             color: this.state.currentColor,
             name: this.state.newColorName
         };
         this.props.addNewColor(newColor);
         this.setState({newColorName: ""});
     }
    render(){
        const {paletteIsFull}=this.props;
        const {currentColor, newColorName}=this.state;
        return(
            <div>
                <ChromePicker 
                        color={currentColor}
                        onChangeComplete={this.updateCurrentColor}
                    />
                    <ValidatorForm onSubmit={this.handleSubmit}>
                        <TextValidator
                            value={newColorName} 
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
                            style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
                        > 
                            {paletteIsFull ? "Palette Full": "Add Color"}
                        </Button>
                    </ValidatorForm>
            </div>
        );
    }
}

export default ColorPickerForm;