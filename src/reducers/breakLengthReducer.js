import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function breakLengthReducer(state = initialState.breakLength, action) {
  switch (action.type) {
    case types.SET_BREAK_LENGTH:
      if ( action.length < 1 ) {
        return 1;
      }

      if (action.length > 60) {
        return 60;
      }

      return action.length;
    default:
      return state;
  }
}