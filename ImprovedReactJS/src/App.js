import React from 'react';
import Highstock from './Highstock'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
      item:[]
    };
  }
  
  render() {
    return  <Highstock/>
  }
}

export default App;
