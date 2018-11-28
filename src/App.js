import React, { Component } from 'react';
import './App.css';
import LengthControl from "./components/LengthControl";
import Timer from './components/Timer';
import Controls from './components/Controls';
import { Helmet } from 'react-helmet';
import storageHelper from './storageHelper';

class App extends Component {
  constructor(props) {
    super(props);

    this.defaultState = {
      reset: false,
      breakLength: 5,
      sessionLength: 25,
      isBreak: false,
      running: false
    };

    this.state = this.defaultState;

    // init stored data
    this.state.running = storageHelper.getBool('running')
    this.state.isBreak = storageHelper.getBool('isBreak')

    this.updateAppState = this.updateAppState.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateAppState(prop, val) {
    console.log('Update ' + prop + ' to ' + val);
    this.setState({
      [prop]: val
    });
  }

  reset() {
    const sound = document.getElementById('beep');

    sound.pause();
    sound.currentTime = 0;

    this.defaultState.reset = true;

    sessionStorage.removeItem('timeLeft');
    sessionStorage.removeItem('running');
    sessionStorage.removeItem('isBreak');

    this.setState(this.defaultState);
  }

  render() {
    return (
      <div className="App">
        <Timer sessionLength={this.state.sessionLength}
               breakLength={this.state.breakLength}
               running={this.state.running}
               isBreak={this.state.isBreak}
               reset={this.state.reset}
               updateAppState={this.updateAppState}
        />
        <Controls running={this.state.running}
                  updateAppState={this.updateAppState}
                  reset={this.reset}
        />
        <div id="length-controls">
          <LengthControl value={this.state.breakLength}
                         elemId={"break-length"}
                         label={"Break Length"}
                         labelId={"break-label"}
                         decrementId={"break-decrement"}
                         incrementId={"break-increment"}
                         prop='breakLength'
                         updateAppState={this.updateAppState}
          />
          <LengthControl value={this.state.sessionLength}
                         elemId={"session-length"}
                         label={"Session Length"}
                         labelId={"session-label"}
                         decrementId={"session-decrement"}
                         incrementId={"session-increment"}
                         prop='sessionLength'
                         updateAppState={this.updateAppState}
          />
        </div>
      </div>
    );
  }
}

export default App;
