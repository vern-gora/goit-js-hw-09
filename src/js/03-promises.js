import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const formEl = document.querySelector('form');

formEl.addEventListener('submit', event => {
  event.preventDefault();
  const delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);
  if (Number(delay) < 0 || Number(step) < 0 || Number(amount) < 0) {
    Notify.warning("Values can't be negative");
  } else if (Number(amount) === 0) {
    Notify.warning("Amount can't be zero");
  } else {
    for (let i = 0; i < amount; i++) {
      createPromise(i, delay + step * i)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        });
    }
  }
});
