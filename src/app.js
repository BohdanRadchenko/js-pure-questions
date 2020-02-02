import {isValid, createModal} from "./utils";
import {Question} from "./question";
import './styles.css'
import {authWithEmailAndPassword, getAuthForm} from "./auth";

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const submitBnt = form.querySelector('#submit');
const input =  form.querySelector('#input');

const openModal = (e) => {
  const renderModalAfterAuth = (content) => {
    if (typeof content === 'string') {
      createModal('Error', content)
    } else {
      createModal('question list', Question.listToHtml(content))
    }
  };

  const authFormHandler = (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.disabled = true;
    const email = e.target.querySelector('#email').value;
    const password = e.target.querySelector('#password').value;
    authWithEmailAndPassword(email, password)
      .then(token => {
      return Question.fetch(token)
    })
      .then((data) => renderModalAfterAuth(data))
      .then(() => btn.disabled = false)
  };
  createModal('Authfication', getAuthForm())
  document.getElementById('auth-form')
    .addEventListener('submit', authFormHandler, {once : true})
};
modalBtn.addEventListener('click', openModal);

window.addEventListener('load', Question.renderList());

const submitFormHandler = e => {
  e.preventDefault()
  console.log('input.value', input.value)
  if(isValid(input.value)) {
    const question = {
      text : input.value.trim(),
      date: new Date().toJSON()
    };
    submitBnt.disabled = true;
    Question.create(question).then(() => {
      console.log('question', question);
      input.value = '';
      input.className = '';
      submitBnt.disabled = false
    })
  }
};

form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
  submitBnt.disabled = !isValid(input.value)
})