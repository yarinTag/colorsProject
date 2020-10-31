import React, { Component } from 'react'
import {ChromePicker} from "react-color";
import { Button, colors } from "@material-ui/core";
import {ValidatorForm, TextValidator} from "react-material-ui-form-validator";
import {withStyles} from "@material-ui/core/styles";
import styles from "./styles/ColorPickerFormStyles";

/*const styles = {

    picker: {
        width: "35vh !important",
        marginTop: "2rem"
        
    },
    addColor: {
        width: "100%",
        padding: "1rem",
        marginTop: "1rem",
        fontSize: "2rem"
    },
    inputName: {
        width: "100%",
        height: "70px"
    }

}*/

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
        const {paletteIsFull,classes}=this.props;
        const {currentColor, newColorName}=this.state;
        return(
            <div>
                <ChromePicker 
                        color={currentColor}
                        onChangeComplete={this.updateCurrentColor}
                        className={classes.picker}
                    />
                    <ValidatorForm onSubmit={this.handleSubmit} ref='form' instantValidate={false}>
                        <TextValidator
                            value={newColorName} 
                            name="newColorName"
                            variant="filled"
                            placeholder="Color Name"
                            onChange={this.handleChange}
                            className={classes.inputName}
                            validators={["required","isColorNameUnique","isColorUnique"]}
                            errorMessages={["Enter a Color Name","Color name must be Unique","Color already used!"]}
                        />
                        <Button 
                            variant="contained"
                            type="submit"
                            color="primary" 
                            className={classes.addColor}
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

export default withStyles(styles)(ColorPickerForm);