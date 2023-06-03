const form = document.querySelector('form');
const inputs = form.querySelectorAll('input');
const month = form.querySelector('#month');
const year = form.querySelector('#year');
const ul = form.querySelector('ul');
const cvc = form.querySelector('#cvc');
const li = Array.from(ul.children);
let errors = [];

form.addEventListener('submit', e => {
  e.preventDefault();

  const name = li[0].querySelector('input');
  const num = li[1].querySelector('input');

  
  if (name.value === '') {
    addWarning(name,'required');
  } else if (!isNaN(name.value)) {
    addWarning(name,'invalid')
  } else if (name.value.length >= 20 ) {
    addWarning(name,'too many characters')
  } else if (name.value.length <= 4 ) {
    addWarning(name,'too short')
  } else {
    removeWarning(name,'');
  }

  if (num.value === '') {
    addWarning(num,'number is required')
  } else if (num.value.length >= 18 || num.value.length < 17) {
    addWarning(num,`17 numbers are required, Your current value is ${num.value.length}`)
  } else {
    removeWarning(num,'');
  }

  if (month.value === '') {
    addWarning(month,'is required')
  } else if (month.value.length >= 3 || month.value > 12) {
    addWarning(month,'invalid month')
  } else {
    removeWarning(month,'')
  }

  if (year.value === '') {
    addWarning(year,'is required')
  } else if (year.value.length >= 3) {
    addWarning(year,'invalid')
  } else {
    removeWarning(year,'')
  }

  
  if (errors.length > 0) {
    e.preventDefault();
  } else {
    render(num.value,name.value,`${month.value}/${year.value}`)
  }
  console.log(errors)
})

const cardInfo = document.querySelector('.card-info');
const cardInfoChildren = Array.from(cardInfo.children);
const cardNameDate = Array.from(cardInfoChildren[1].children);
const success = document.querySelector('.success-submit')
function render(number,name,date) {
  cardNameDate[0].innerText = name;
  cardInfoChildren[0].innerText = number;
  cardNameDate[1].innerText = date;
  form.innerHTML = `
  <div class="success-submit">
  <img src="images/icon-complete.svg" alt="">
  <h2>Thank you!</h2>
  <div>We've added your card details</div>
  <button>
    Continue
  </button>
</div>
  
  `
}

function addWarning(input,message) {
  const box = input.closest('.box');
  const err = input.nextElementSibling;
  errors.push(err);
  err.innerText = message;
  box.classList.add('warning');
}
function removeWarning(input,message) {
  const box = input.closest('.box');
  const err = input.nextElementSibling;
  errors = [];
  err.innerText = message;
  box.classList.remove('warning');
}