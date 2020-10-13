import React, { Component } from 'react';
import { generatePalette } from './ColorHelpers';
import Palette from './Palette';
import SeedColors from './SeedColors';

class App extends Component{
render(){
  return (
      <div className="App">
          <Palette palette={generatePalette(SeedColors[4])}/>
      </div>
    );
  }
}
export default App;
 