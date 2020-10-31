import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import chroma from "chroma-js";
import classNames from "classnames";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ColorBoxStyles";

class ColorBox extends Component{
    constructor(props){
        super(props);
        this.state={copied: false};
        this.changeCopyState=this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied: true},()=>{
            setTimeout(()=>this.setState({copied: false}),1500);
        });
    }
render(){
    const {name, background, classes}=this.props;
    const isDarkColor=(chroma(background).luminance()) <= 0.067;
    const isLightColor=(chroma(background).luminance()) >= 0.61;
    const {copied}=this.state;
  return (
      
      <div style={{background: this.props.background}} className={classes.ColorBox}>
          <div
            style={{ background }}
            className={classNames(classes.copyOverlay, {
              [classes.showOverlay]: copied
            })}
          />
          <div
            className={classNames(classes.copyMessage, {
              [classes.showMessage]: copied
            })}
          >
            <h1>copied!</h1>
             <p className={classes.copyText}>{this.props.background}</p>
         </div>
         <div className="copy-container">
             <div className={classes.boxContent}>
                <span className={classes.colorName}>{name}</span>
             </div>
             <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <button className={classes.copyButton}>Copy</button>
             </CopyToClipboard>
         </div>
         {this.props.showLink && (
         <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e=> e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
         </Link>
         )}
      </div>
    );
  }
}
export default withStyles(styles)(ColorBox);
