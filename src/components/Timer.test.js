import { mount, shallow } from 'enzyme';
import Timer from './Timer';
import React from 'react';

function setup( { sessionLength = 25, breakLength = 5, running = false } = {} ) {
  jest.useFakeTimers();

  const props= {
    sessionLength,
    breakLength,
    running,
    updateAppState: jest.fn()
  };

  return mount(<Timer {...props} />);
}

describe('Timer', () => {
  it('Has label element', () => {
    const wrapper = setup();

    expect(wrapper.find('#timer-label').length).toBe(1);
  });
  it('Has time left element', () => {
    const wrapper = setup();

    expect(wrapper.find('#time-left').length).toBe(1);
  });
	it('The time format is correct', () => {
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
    const wrapper = setup();
    const defaultTime = wrapper.instance().defaultTime;
    console.log(defaultTime);
    wrapper.instance().isBreak = true;
    wrapper.setProps({ reset: true });

    expect(wrapper.state().isBreak).toBe(false);
    expect(wrapper.state().timeLeft).toBe(defaultTime);

    expect(wrapper.props().updateAppState.mock.calls.length).toBe(1);
    expect(wrapper.props().updateAppState.mock.calls[0][0]).toBe('reset');
    expect(wrapper.props().updateAppState.mock.calls[0][1]).toBe(false);
  });
  it('Change session length', () => {
    const wrapper = setup();
    wrapper.setProps({ sessionLength: 30 });

    expect(wrapper.state().timeLeft).toBe(1800000)
  });
  it('Toggle start/stop when running toggles', () => {
    const wrapper = setup();
    const spy = jest.spyOn(wrapper.instance(), 'toggleStartStop');
    wrapper.setProps({ running: true });

    expect(spy).toHaveBeenCalledWith(true);
  });
  it('Timeout clears on unmomunt', () => {
    const wrapper = setup();
    wrapper.instance().timer = 1;
    wrapper.instance().componentWillUnmount();

    expect(clearInterval).toHaveBeenCalledWith(1);
  });
});