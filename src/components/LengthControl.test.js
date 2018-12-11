import { mount, shallow } from 'enzyme';
import LengthControl from './LengthControl';
import React from 'react';
import initialState from '../reducers/initialState';

import rootReducer from '../reducers';
import { createStore } from 'redux';

let store = null;

afterEach(() => {
  store = createStore(rootReducer, initialState);
});

function setup(value = 5, method = 'mount') {

  initialState.breakLength = value;
  store = createStore(rootReducer, initialState);

  const props = {
    type: 'break',
    label: 'Break Length',
    labelId: 'break-label',
    decrementId: 'break-decrement',
    incrementId: 'break-increment',
    elemId: 'break-length',
    setLength: jest.fn(),
    // changeHandle: jest.fn(),
    store
  };

  const set = (method === 'shallow') ? shallow : mount;

  return set(<LengthControl {...props}/>);
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
  it('changeHandle', () => {
    const wrapper = setup(5, 'shallow').dive();

    // test for allowed value
    const event = { target: { value: 7 } };

    wrapper.instance().changeHandle(event);

    expect(store.getState().breakLength).toBe(7);

    // test for min value
    const event2 = { target: { value: 0 } };
    wrapper.instance().changeHandle(event2);

    expect(store.getState().breakLength).toBe(1);

    // test for max value
    const event3 = { target: { value: 100 } };
    wrapper.instance().changeHandle(event3);

    expect(store.getState().breakLength).toBe(60);
  });
});