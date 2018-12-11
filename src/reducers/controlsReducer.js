import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function controlsReducer(state = initialState.running, action) {
  switch (action.type) {
    case types.START_TIMER:
      return true;
    case types.STOP_TIMER:
      return false;
    default:
      return state;
  }
}