import React, { Component } from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {Link} from 'react-router-dom';
import "./ColorBox.css";


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
  return (
      
      <div style={{background: this.props.background}} className="ColorBox">
         <div style={{background}} className={`copy-overlay ${this.state.copied && "show"}`}/>
         <div className={`copy-msg ${this.state.copied && "show"}`}>
             <h1>Copied!</h1>
             <p>{this.props.background}</p>
         </div>
         <div className="copy-container">
             <div className="box-content">
                <span>{name}</span>
             </div>
             <CopyToClipboard text={background} onCopy={this.changeCopyState}>
             <button className="copy-button">Copy</button>
             </CopyToClipboard>
         </div>
         {this.props.showLink && (
         <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e=> e.stopPropagation()}>
            <span className="see-more">More</span>
         </Link>
         )}
      </div>
    );
  }
}
export default ColorBox;

