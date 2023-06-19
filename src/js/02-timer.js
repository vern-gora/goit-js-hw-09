import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let outDate = 0;

const onCount = () => {
  startBtn.disable = true;
  inputEl.disable = false;
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startBtn.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      outDate = selectedDates[0] - new Date();
    }
  },
};

function outTime(outDate) {
  const { days, hours, minutes, seconds } = convertMs(outDate);
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputEl, options);

window.addEventListener('load', onCount);

startBtn.addEventListener('click', () => {
  inputEl.disable = true;
  startBtn.disable = true;

  const timer = setInterval(() => {
    if (outDate > 1000) {
      outDate -= 1000;
      outTime(outDate);
    } else {
      clearInterval(timer);
      inputEl.disable = false;
      startBtn.disable = false;
    }
  }, 500);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
