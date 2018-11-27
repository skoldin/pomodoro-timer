import React from 'react';
import { shallow, mount } from 'enzyme';
import Controls from './Controls';

function setup(running = false) {
  const props = {
    running,
    reset: jest.fn(),
    updateAppState: () => {}
  };

  return mount(<Controls {...props} />);
}

describe('Controls', () => {
  it('Has start/stop button', () => {
    const wrapper = setup();

    expect(wrapper.find('#start_stop').length).toBe(1);
  });

  it('Has reset button', () => {
    const wrapper = setup();

    expect(wrapper.find('#reset').length).toBe(1);
  });

  it('State toggles', () => {
    const wrapper = setup();

    expect(wrapper.state('running')).toBe(false);
    wrapper.find('#start_stop').simulate('click');
    expect(wrapper.state('running')).toBe(true);
    wrapper.find('#start_stop').simulate('click');
    expect(wrapper.state('running')).toBe(false);
  });
  it('Calls reset and stops running on reset', () => {
    const wrapper = setup(true);

    wrapper.instance().reset();

    expect(wrapper.props().reset.mock.calls.length).toBe(1);
    expect(wrapper.state().running).toBe(false);
  })
});