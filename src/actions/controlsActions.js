import * as types from './actionTypes';

export function startTimer() {
  return { type: types.START_TIMER };
}

export function stopTimer() {
  return { type: types.STOP_TIMER };
}

export function reset() {
  return { type: types.RESET };
}