'use strict';
const form = document.querySelector('.feedback-form');
const throttle = require('lodash.throttle');

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// Using an Immediately Invoked Function Expression (IIFE) for checking localStorage
(() => {
  if (load('feedback-form-state') === undefined) {
    return;
  } else {
    form.elements.email.value = load('feedback-form-state').email || '';
    form.elements.message.value = load('feedback-form-state').message || '';
  }
})();

const saveLS = () => {
  let data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };
  save('feedback-form-state', data);
};

form.addEventListener('input', throttle(saveLS, 500));

const formHandler = e => {
  e.preventDefault();
  console.log(load('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  form.reset();
};

form.addEventListener('submit', formHandler);
