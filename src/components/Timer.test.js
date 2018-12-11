import { mount, shallow } from 'enzyme';
import { Timer, mapStateToProps } from './Timer';
import React from 'react';

import initialState from '../reducers/initialState';
import configureStore from 'redux-mock-store';

let store = null;
let mockStore = configureStore();

function setup( { sessionLength = 25, breakLength = 5, running = false } = {}, method = 'shallow' ) {
  jest.useFakeTimers();
  let state = initialState;

  state.sessionLength = sessionLength;
  state.breakLength = breakLength;
  state.running = running;

  store = mockStore(state);

  const set = (method === 'shallow') ? shallow : mount;

  return set(<Timer store={store}/>);
}

describe('Timer', () => {
  afterEach(() => {
    store = mockStore(initialState);
  });

  it('Has label element', () => {
    const wrapper = setup();

    expect(wrapper.find('#timer-label').length).toBe(1);
  });
  it('Has time left element', () => {
    const wrapper = setup();

    expect(wrapper.find('#time-left').length).toBe(1);
  });
  // this needs connected component to test. Maybe test in another place
	it.skip('The time format is correct', () => {
    const wrapper = setup();

    const time = wrapper.find('#time-left').text().split(':');

    expect(time.length).toBe(2);
    expect(time[0].length).toBe(2);
    expect(time[1].length).toBe(2);
  });
	it('resetTimer', () => {
    const wrapper = setup();
    wrapper.instance().timer = 1;

    wrapper.instance().resetTimer();

    expect(clearInterval).toHaveBeenCalledWith(1);
    expect(wrapper.instance().timer).toBeNull();
  });
	it('toggleStartStop', () => {
    const wrapper = setup();
    const spyReset = jest.spyOn(wrapper.instance(), 'resetTimer');

    // test timer not running
    wrapper.instance().toggleStartStop(false);
    expect(spyReset).toHaveBeenCalled();

    spyReset.mockReset();

    // test timer set and running
    wrapper.instance().toggleStartStop(true);
    expect(setInterval).toHaveBeenCalled();
  });

  it('toggleStartStop do nothing if is running but timer set', () => {
    const wrapper = setup();
    const spyReset = jest.spyOn(wrapper.instance(), 'resetTimer');

    wrapper.instance().timer = 1;
    wrapper.instance().toggleStartStop(true);

    expect(spyReset).not.toHaveBeenCalled();
    expect(setInterval).not.toHaveBeenCalled();
  });
  it('Reset', () => {
    const wrapper = setup( { sessionLength: 10, breakLength: 7, running: true }, 'mount');
    const defaultTime = wrapper.instance().defaultTime;

    wrapper.setState({
      isBreak: true,
      timeLeft: 1111
    });

    wrapper.setProps({
      reset: true
    });

    wrapper.update();

    expect(wrapper.state('timeLeft')).toBe(defaultTime);
    expect(wrapper.state('isBreak')).toBe(false);
  });
  // maybe test in another place
  it.skip('Change session length', () => {
    const wrapper = setup();
    wrapper.setProps({ sessionLength: 30 });

    expect(wrapper.state().timeLeft).toBe(1800000)
  });
  it('Toggle start/stop when running toggles', () => {
    const wrapper = setup();
    const spy = jest.spyOn(wrapper.instance(), 'toggleStartStop');
    wrapper.setProps({ running: true });

    expect(spy).toHaveBeenCalledWith(true);
    expect(sessionStorage.getItem('running')).toBe('true');
  });
  it('Timeout clears on unmomunt', () => {
    const wrapper = setup();
    wrapper.instance().timer = 1;
    wrapper.instance().componentWillUnmount();

    expect(clearInterval).toHaveBeenCalledWith(1);
  });
  it('Sets session length', () => {
    const wrapper = setup({ sessionLength: 25, breakLength: 5, running: false }, 'mount');

    wrapper.setProps({
      sessionLength: 30,
      breakLength: 10
    });

    expect(wrapper.state('isBreak')).toBe(false);
    expect(wrapper.state('timeLeft')).toBe(60000 * 30);

    // wrapper.setState({
    //   isBreak: true
    // });
    //
    // expect(wrapper.state('timeLeft')).toBe(60000 * 10);
  });
});