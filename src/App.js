import React, { Component } from 'react';
import './App.css';
import LengthControl from "./components/LengthControl";
import Timer from './components/Timer';
import Controls from './components/Controls';
import { createStore, configureStore } from 'redux';
import { Provider, connect } from 'react-redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';

const store = createStore(rootReducer, initialState);

class RootContainer extends Component {
  constructor(props) {
    super(props);

    this.state = store.getState();
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Timer/>
          <Controls/>
          <div id="length-controls">
            <LengthControl elemId={"break-length"}
                           label={"Break Length"}
                           labelId={"break-label"}
                           decrementId={"break-decrement"}
                           incrementId={"break-increment"}
                           type='break'
            />
            <LengthControl elemId={"session-length"}
                           label={"Session Length"}
                           labelId={"session-label"}
                           decrementId={"session-decrement"}
                           incrementId={"session-increment"}
                           type='session'
            />
          </div>
        </div>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    breakLength: state.breakLength,
    sessionLength: state.sessionLength,
    isBreak: state.isBreak,
    running: state.running
  }
}

const ConnectedRootContainer = connect(mapStateToProps)(RootContainer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRootContainer/>
      </Provider>
    );
  }
}

export default App;
