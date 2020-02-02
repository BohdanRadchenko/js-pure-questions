export class Question {
  static create(question) {
    return fetch('https://js-pure-project.firebaseio.com/questions.json', {
      method: "POST",
      body: JSON.stringify(question),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        question.id = data.name;
        return question;
      })
      .then(addToLocalStorage(question))
      .then(Question.renderList())
  }

  static fetch(token) {
    if (!token) {
      return Promise.resolve('<p class="error"> You did not have token</p>')
    }
    return fetch(`https://js-pure-project.firebaseio.com/questions.json?auth=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          return `<p class="error">${data.error}</p>`
        }
        return data ? Object.keys(data).map(key => ({
          ...data[key],
          id: key
        })) : []
      })
  }

  static listToHtml(questions) {
    console.log('questions', questions)
    return questions.length
      ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
      : '<p>You dont have a questions</p>'
  }

  static renderList() {
    const question = getQuestionLocalStorage();
    const html = question.length
      ? question.map(el => toCard(el)).join('')
      : `<div class="mui--text-headline">Don\`t have a questions </div>`
    const list = document.getElementById('list');
    list.innerHTML = html;
  }

}

const addToLocalStorage = question => {
  const all = getQuestionLocalStorage();
  all.push(question)
  localStorage.setItem('question', JSON.stringify(all))
};


const getQuestionLocalStorage = () => {
  return JSON.parse(localStorage.getItem('question') || '[]')
};

const toCard = (question) => {
  return `
    <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
    </div>
    <div>${question.text}</div>
    <br>`
};
