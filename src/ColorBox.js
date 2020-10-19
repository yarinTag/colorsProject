import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import "./ColorBox.css";
import chroma from "chroma-js";

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
    const {name, background}=this.props;
    const isDarkColor=(chroma(background).luminance()) <= 0.067;
    const isLightColor=(chroma(background).luminance()) >= 0.61;
  return (
      
      <div style={{background: this.props.background}} className="ColorBox">
         <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
         <div className={`copy-msg ${this.state.copied && "show"}`}>
             <h1>Copied!</h1>
             <p className={isLightColor && "dark-text"}>{this.props.background}</p>
         </div>
         <div className="copy-container">
             <div className="box-content">
                <span className={isDarkColor && "light-text"}>{name}</span>
             </div>
             <CopyToClipboard text={background} onCopy={this.changeCopyState}>
             <button className={`copy-button ${isLightColor && "dark-text"}`}>Copy</button>
             </CopyToClipboard>
         </div>
         {this.props.showLink && (
         <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e=> e.stopPropagation()}>
            <span className={`see-more ${isLightColor && "dark-text"}`}>More</span>
         </Link>
         )}
      </div>
    );
  }
}
export default ColorBox;

