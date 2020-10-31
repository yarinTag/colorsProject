import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import styles from "./styles/PaletteListStyles";

/*const styles={
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
        color: "white",
        alignItems: "center",
        "& a": {
            color: "gray"
        }
        
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3,30%)",
        gripGap: "2.5rem",
        
    }
};*/

class PaletteList extends Component{
    constructor(props){
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.goToPalette=this.goToPalette.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
   
    openDialog(id) {
        this.setState({ openDeleteDialog: true, deletingId: id });
    }
    closeDialog() {
        this.setState({ openDeleteDialog: false, deletingId: "" });
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingId);
        this.closeDialog();
     }

    render(){
        const {palettes,classes}=this.props;
        const { openDeleteDialog } = this.state;
        return(
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>React Colors</h1>
                        <Link to="/palette/new">Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map(palette=>(
                          <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                              <MiniPalette {...palette}
                                goToPalette={this.goToPalette}
                                openDialog={this.openDialog}
                                key={palette.id}
                                id={palette.id}
                              />
                          </CSSTransition>
                       ))}
                    </TransitionGroup>
                </div>            
                <Dialog
                    open={openDeleteDialog}
                    aria-labelledby='delete-dialog-title'
                    onClose={this.closeDialog}
                >
                <DialogTitle id='delete-dialog-title'>
                    Delete This Palette?
                </DialogTitle>
                <List>
                    <ListItem button onClick={this.handleDelete}>
                        <ListItemAvatar>
                            <Avatar
                            style={{ backgroundColor: blue[100], color: blue[600] }}
                            >
                            <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Delete' />
                    </ListItem>
                    <ListItem button onClick={this.closeDialog}>
                        <ListItemAvatar>
                            <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                            <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Cancel' />
                    </ListItem>
                </List>
                </Dialog>
            </div>
        );
    }
}
export default withStyles(styles)(PaletteList);
