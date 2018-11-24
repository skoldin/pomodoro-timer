import React, { Component } from 'react';
import './App.css';
import LengthControl from "./components/LengthControl";
import Timer from './components/Timer';
import Controls from './components/Controls';

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
    this.updateAppState = this.updateAppState.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateAppState(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  reset() {
    const sound = document.getElementById('beep');

    sound.pause();
    sound.currentTime = 0;

    this.defaultState.reset = true;

    this.setState(this.defaultState);
  }

  render() {
    return (
      <div className="App">
        <LengthControl value={this.state.breakLength}
                       elemId={"break-length"}
                       label={"Break Length"}
                       labelId={"break-label"}
                       decrementId={"break-decrement"}
                       incrementId={"break-increment"}
                       prop='breakLength'
                       updateAppState={this.updateAppState}
                       disabled={this.state.running}
        />
        <LengthControl value={this.state.sessionLength}
                       elemId={"session-length"}
                       label={"Session Length"}
                       labelId={"session-label"}
                       decrementId={"session-decrement"}
                       incrementId={"session-increment"}
                       prop='sessionLength'
                       updateAppState={this.updateAppState}
                       disabled={this.state.running}
        />
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
      </div>
    );
  }
}

export default App;
