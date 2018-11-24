import { mount, shallow } from 'enzyme';
import LengthControl from './LengthControl';
import React from 'react';

function setup(value = 5) {
  const props = {
    value: value,
    label: 'Break Length',
    labelId: 'break-label',
    decrementId: 'break-decrement',
    incrementId: 'break-increment',
    incrementHandle: () => {
      // props.value += 1;
    },
    decrementHandle: () => {
      // props.value -= 1;
    },
    updateAppState: () => {

    }
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

    expect(wrapper.find('.value').text()).toBe('5');
  });
  it('Increments value', () => {
    const wrapper = setup();

    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').text()).toBe('6');
  });
  it('Decrements value', () => {
    const wrapper = setup();

    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').text()).toBe('4');
  });
  it('Does not go below the min value', () => {
    const wrapper = setup(2);

    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').text()).toBe('1');
    wrapper.find('#break-decrement').simulate('click');
    expect(wrapper.find('.value').text()).toBe('1');
  });
  it('Does not go above the max value', () => {
    const wrapper = setup(59);

    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').text()).toBe('60');
    wrapper.find('#break-increment').simulate('click');
    expect(wrapper.find('.value').text()).toBe('60');
  });
});