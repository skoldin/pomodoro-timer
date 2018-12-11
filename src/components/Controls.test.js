import React from 'react';
import { shallow, mount } from 'enzyme';
import Controls from './Controls';

import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

let store = null;

afterEach(() => {
  store = createStore(rootReducer, initialState);
});

function setup(running = false, method = 'mount') {
  initialState.running = running;

  store = createStore(rootReducer, initialState);

  const props = {
    store
  };

  const set = (method === 'shallow') ? shallow : mount;

  return set(<Controls {...props} />);
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

  it('State and local storage values toggle', () => {
    const wrapper = setup();

    expect(store.getState().running).toBe(false);
    wrapper.find('#start_stop').simulate('click');
    expect(store.getState().running).toBe(true);
    wrapper.find('#start_stop').simulate('click');
    expect(store.getState().running).toBe(false);
  });
});