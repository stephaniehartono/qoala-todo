import React, {Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Left from './components/Left';
import Right from './components/Right';

class App extends Component {
  render(){
    return (
      <div className="App">
        <div className="left">
          <Left />
        </div>
        <div className="right">
          <Right />
        </div>
      </div>
    );
  }
}



export default App;
