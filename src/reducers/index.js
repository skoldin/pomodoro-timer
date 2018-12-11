import { combineReducers } from 'redux';
import running from './controlsReducer';
import sessionLength from './sessionLengthReducer';
import breakLength from './breakLengthReducer';
import initialState from './initialState';
import * as types from '../actions/actionTypes';

const appReducer = combineReducers({
  running,
  sessionLength,
  breakLength,
  reset: (state, action) => (action.type === types.RESET)
});

const rootReducer = (state, action) => {
  if (action.type === types.RESET) {
    state = {
      breakLength: 5,
      sessionLength: 25,
      running: false
    };
  }

  return appReducer(state, action);
};

export default rootReducer;