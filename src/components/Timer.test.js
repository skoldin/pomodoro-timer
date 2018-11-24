import { mount, shallow } from 'enzyme';
import Timer from './Timer';
import React from 'react';

function setup( { sessionLength = 25, breakLength = 5, running = false } = {} ) {
  const props= {
    sessionLength,
    breakLength,
    running
  };

  return shallow(<Timer {...props} />);
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
});