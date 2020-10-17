import React, { Component } from 'react';
import { generatePalette } from './ColorHelpers';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import SeedColors from './SeedColors';
import PaletteList from './PaletteList';

class App extends Component{

  findIdPalette(id){
    return SeedColors.find(function(palette){
      return palette.id===id;
    });
  }

render(){
  return (
    
    <Switch>
    <Route exact path ='/' render={() => <PaletteList palettes={SeedColors}/>} />
    <Route exact path='/palette/:id' render={routeProps => (
        <Palette palette={generatePalette(this.findIdPalette(routeProps.match.params.id))}/>
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
 