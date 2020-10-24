import React, { Component } from 'react';
import { generatePalette } from './ColorHelpers';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import SeedColors from './SeedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component{

  findIdPalette(id){
    return SeedColors.find(function(palette){
      return palette.id===id;
    });
  }

render(){
  return (
    
    <Switch>
      <Route exact path="/palette/new" render={()=><NewPaletteForm/>}/>
      <Route exact path ='/' render={routeProps => (<PaletteList palettes={SeedColors} {...routeProps}/>)}/>
      <Route exact path='/palette/:id' render={routeProps => (
          <Palette palette={generatePalette(this.findIdPalette(routeProps.match.params.id))}/>
      )}
      />
      <Route exact path='/palette/:paletteId/:colorId' render={routeProps => (
          <SingleColorPalette
          colorId={routeProps.match.params.colorId} 
          palette={generatePalette
            (this.findIdPalette(routeProps.match.params.paletteId)
          )}
        />
      )}
      />
    </Switch>


    // <div className="App">
      //    <Palette palette={generatePalette(SeedColors[4])}/>
      //</div>
    );
  }
}
export default App;
 