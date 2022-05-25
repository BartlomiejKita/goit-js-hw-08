var throttle = require('lodash.throttle');

//////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////
const form = document.querySelector('.feedback-form');

updateOutput();
form.addEventListener('input', throttle(saveData, 500));

function saveData(event) {
  const data = {
    email: form.elements.email.value,
    message: form.elements.message.value,
  };

  save('feedback-form-state', data);
}
function updateOutput() {
  form.elements.email.value = load('feedback-form-state').email ?? '';
  form.elements.message.value = load('feedback-form-state').message ?? '';
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  console.log(load('feedback-form-state'));
  localStorage.removeItem('feedback-form-state');
  form.reset();
}
