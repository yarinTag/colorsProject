import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component{
    constructor(props){
        super(props);
        this.state={
            stage: "form",
            open: true,
            newPaletteName: ""
        };
        this.handleChange=this.handleChange.bind(this);
        this.showEmojiPicker=this.showEmojiPicker.bind(this);
        this.savePalette=this.savePalette.bind(this);
    }

   handleClickOpen = () => {
    this.setState({open: true});
  };

   handleClose = () => {
     this.setState({open: false});
  };

   componentDidMount() {
         //The PaletteName itself is unique
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => 
         this.props.palettes.every(
         ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
         )
        );
    }

     handleChange(evt){
         this.setState({
             [evt.target.name]: evt.target.value
         });
     }
  
     showEmojiPicker(){
         this.setState({stage: "emoji"});
     }

     savePalette(emoji){
         //console.log(emoji.native);
         const newPalette= {
             paletteName: this.state.newPaletteName,
             emoji: emoji.native
         };
         this.props.handleSubmit(newPalette);
     }

  render() {
    const {newPaletteName}=this.state;
    const {hideForm, handleSubmit}=this.props;
    return (
        <div>
            <Dialog open={this.state.stage === "emoji"} onClose={hideForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker 
                    onSelect={this.savePalette}
                    title="Pick a Palette Emoji"
                />
            </Dialog>
            <Dialog 
                open={this.state.open}
                onClose={hideForm}
                aria-labelledby="form-dialog-title" 
            >
                <ValidatorForm onSubmit={this.showEmojiPicker}>
                <DialogContent>
                <DialogContentText>
                    Please enter a name for your new palette. Make sure it's Unique!
                </DialogContentText>
                    <TextValidator 
                        label="Palette Name"
                        value={newPaletteName}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        name="newPaletteName"
                        validators={["required","isPaletteNameUnique"]}
                        errorMessages={["Enter Palette Name","Name already Used"]}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={hideForm} color="primary">
                    Cancel
                </Button>
                <Button variant='contained' color='primary' type="submit" >
                    Save Palette
                </Button>
                </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
        );
    }
}

export default PaletteMetaForm;