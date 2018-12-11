import * as types from './actionTypes';

export function setSessionLength( length ) {
  return { type: types.SET_SESSION_LENGTH, length };
}

export function setBreakLength( length ) {
  return { type: types.SET_BREAK_LENGTH, length };
}