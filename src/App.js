import React, { Component } from 'react';
import { generatePalette } from './ColorHelpers';
import {Route, Switch} from 'react-router-dom';
import Palette from './Palette';
import SeedColors from './SeedColors';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {palettes: SeedColors};
    this.savePalette =this.savePalette.bind(this);
    this.findIdPalette =this.findIdPalette.bind(this);

  }

  findIdPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id===id;
    });
  }

  savePalette(NewPalette){
    this.setState({palettes: [...this.state.palettes,NewPalette]})
  }

render(){
  return (
    
    <Switch>
      <Route exact path="/palette/new" render={routeProps => (
        <NewPaletteForm
          savePalette={this.savePalette} {...routeProps}
        />
      
      )}/>
      <Route exact path ='/' render={routeProps => (<PaletteList palettes={this.state.palettes} {...routeProps}/>)}/>
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
 