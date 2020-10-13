import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import "./ColorBox.css";


class ColorBox extends Component{
render(){
    const {name, background}=this.props;
  return (
      
      <div style={{background: this.props.background}} className="ColorBox">
         <div className="copy-container">
             <div className="box-content">
                <span>{name}</span>
             </div>
             <CopyToClipboard text={background}>
             <button className="copy-button">Copy</button>
             </CopyToClipboard>
         </div>
         <span className="see-more">More</span>
      </div>
    );
  }
}
export default ColorBox;

