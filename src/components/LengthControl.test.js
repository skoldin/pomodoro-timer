import { mount, shallow } from 'enzyme';
import LengthControl from './LengthControl';
import React from 'react';

function setup(value = 5) {
  const props = {
    prop: 'breakLength',
    value,
    label: 'Break Length',
    labelId: 'break-label',
    decrementId: 'break-decrement',
    incrementId: 'break-increment',
    elemId: 'break-length',
    incrementHandle: () => {},
    decrementHandle: () => {},
    updateAppState: jest.fn()
  };

  return mount(<LengthControl {...props}/>)
}

describe('Length Control component', () => {
  it('Has break label', () => {
    const wrapper = setup();

    expect(wrapper.find('#break-label').length).toBe(1);
  });
  it('Has increment label', () => {
    const wrapper = setup();

    expect(wrapper.find('#break-decrement').length).toBe(1);
  });
  it('Has decrement label', () => {
    const wrapper = setup();

    expect(wrapper.find('#break-increment').length).toBe(1);
  });
  it('Has default value', () => {
    const wrapper = setup();

    expect(wrapper.find('.value').props().value).toBe(5);
  });
  it('Increments value', () => {
    const wrapper = setup();

    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(6);
  });
  it('Decrements value', () => {
    const wrapper = setup();

    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(4);
  });
  it('Does not go below the min value', () => {
    const wrapper = setup(2);

    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(1);
    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(1);
  });
  it('Does not go above the max value', () => {
    const wrapper = setup(59);

    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(60);
    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').props().value).toBe(60);
  });
  it('Passing in value changes state', () => {
    const wrapper = setup(5);

    expect(wrapper.state().value).toBe(5);

    wrapper.setProps({ value: 10 });

    expect(wrapper.state().value).toBe(10);
  });
  it('changeHandle', () => {
    const wrapper = setup();
    wrapper.setState({
      minValue: 1,
      maxValue: 60
    });

    // test for allowed value
    const event = { target: { value: 7 } };

    wrapper.instance().changeHandle(event);

    expect(wrapper.props().updateAppState.mock.calls.length).toBe(1);
    expect(wrapper.props().updateAppState.mock.calls[0][1]).toBe(7);

    expect(wrapper.state().value).toBe(7);
    wrapper.props().updateAppState.mockClear();

    // test for min value
    const event2 = { target: { value: 0 } };
    wrapper.instance().changeHandle(event2);

    expect(wrapper.props().updateAppState.mock.calls[0][1]).toBe(1);
    expect(wrapper.state().value).toBe(1);

    wrapper.props().updateAppState.mockClear();

    // test for max value
    const event3 = { target: { value: 100 } };
    wrapper.instance().changeHandle(event3);

    expect(wrapper.props().updateAppState.mock.calls[0][1]).toBe(60);
    expect(wrapper.state().value).toBe(60);

    wrapper.props().updateAppState.mockClear();
  });
});