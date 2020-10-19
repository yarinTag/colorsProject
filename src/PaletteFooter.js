import React from "react";

function PaletteFooter(props){
    const {paletteName, emoji}=props; //Without this because it's a function not a class.
    return(
        <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
    )
}

export default PaletteFooter;